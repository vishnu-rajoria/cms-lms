<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use App\Models\DBRecordUpdate;
use App\Models\DBRecordUpdateEntry;

use DB;
use Auth as Auth;
use Illuminate\Support\Carbon;

class NotificationController extends Controller
{
    //
    function getNotification(Request $request)
    {
        $userId = $request->userId;
        $notifications = Notification::where(['recipient_user_id' => $userId, "seen_at" => null])->get()->toArray();
        return $notifications;
    }

    function handleNotificationAction(Request $request)
    {

        $action = $request->action;
        $notificationId = $request->notificationId;
        $recordId = $request->recordId;
        $table = $request->table;
        $loggedInUser = Auth::user();
        $is_batch_updates_successful = true;

        $notification = Notification::where('id', $notificationId)->first()->toArray();
        // print_r($request->all());
        // print_r($notification);

        if ($table = "db_record_updates") {

            // if the action is to accept the profile pic then set the corrosponding fields in various field
            if ($action == "accept.profile.pic.change") {
                $dbRecordUpdate = DBRecordUpdate::where('id', $recordId)->first()->toArray();
                // print_r($dbRecordUpdate);
                $dbRecordUpdateEnteries = DBRecordUpdateEntry::where('db_record_update_id', $recordId)->get()->toArray();
                //print_r($dbRecordUpdateEnteries);

                foreach ($dbRecordUpdateEnteries as $entry) {
                    $selectedTable = $entry['table_name'];
                    $conditionToMatchRecord = (array)json_decode($entry['stringified_conditional_columns_and_values']);
                    $coulmsToUpdateInfo = (array)json_decode($entry['stringified_record_entries']);
                    $coulmsToUpdate = array();
                    foreach ($coulmsToUpdateInfo as $record) {
                        $recordArray  = (array)$record;
                        // print_r($recordArray);
                        $coulmsToUpdate[$recordArray['column_name']] = $recordArray['new_value'];
                    }
                    // print_r($coulmsToUpdate);
                    try {
                        DB::table($selectedTable)->where($conditionToMatchRecord)->update($coulmsToUpdate);
                        DB::table('db_record_update_entries')->where('id', $entry['id'])->update(['is_update_successful' => true]);
                    } catch (\Exception $e) {
                        $is_batch_updates_successful = false;
                    }
                }
            }

            if ($is_batch_updates_successful) {
                Notification::where('id', $notificationId)->update(['seen_at' => Carbon::now()]);

                DB::table("db_record_updates")->where('id', $recordId)->update(['is_record_update_remaining' => false, "verified_by_user_id" => $loggedInUser->id, "is_batch_updates_successful" => true]);

                if ($action == "accept.profile.pic.change") {

                    $savedNotification = Notification::create([
                        "type" => "PPCRA",  //profile_pic_change_request_response
                        "message" => "profile picture approved",
                        "thumbnail_image" => "/storage/app_media/photograph-photo.svg",
                        "sender_user_id" => Auth::user()->id,
                        "recipient_user_id" =>  $notification['sender_user_id'],
                        "created_at" => Carbon::now()
                    ]);
                    $savedNotificationId = $savedNotification->id;

                    $actions = [];
                    $mark_read_notification = ["title" => "ok", "method" => "post", "routeName" => "mark.notification.as.seen", "type" => "axios", "data" => ["table" => "notifications", "recordId" => $savedNotificationId]];

                    $actions[] = $mark_read_notification;

                    Notification::where('id', $savedNotificationId)->update(['stringified_actions' => json_encode($actions)]);

                    return response()->json(["status" => "success", "operation" => "profile_pic_updated_successfully"], 200);
                } elseif ($action == "reject.profile.pic.change") {
                    $savedNotification = Notification::create([
                        "type" => "PPCRR",  //profile_pic_change_request_response
                        "message" => "your recent profile picture change request has been rejected. please check our <a class='link' style='text-decoration:underline' href='" . route('profile.pic.policy') . " target='_blank'>profile picture policy</a> for more details",
                        "thumbnail_image" => "/storage/app_media/warning.svg",
                        "sender_user_id" => Auth::user()->id,
                        "recipient_user_id" =>  $notification['sender_user_id'],
                        "created_at" => Carbon::now()
                    ]);
                    $savedNotificationId = $savedNotification->id;

                    $actions = [];
                    $mark_read_notification = ["title" => "ok", "method" => "post", "routeName" => "mark.notification.as.seen", "type" => "axios", "data" => ["table" => "notifications", "recordId" => $savedNotificationId]];

                    $actions[] = $mark_read_notification;

                    Notification::where('id', $savedNotificationId)->update(['stringified_actions' => json_encode($actions)]);

                    return response()->json(["status" => "success", "operation" => "profile_pic_rejected_successfully"], 200);
                } else {
                    return response()->json(["status" => "can not detect action"], 300);
                }
            } else {
                return response()->json(["status" => "error"], 300);
            }
        }
    }

    function markNotificationAsSeen(Request $request)
    {

        // $table  = $request->table;
        // $recordId = $request->recordId;
        $notificationId = $request->notificationId;
        Notification::where('id', $notificationId)->update(['seen_at' => Carbon::now()]);
        return response()->json(["status" => "success"], 200);
    }
}
