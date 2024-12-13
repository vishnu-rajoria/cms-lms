
<form action="{{route('api.save.student')}}" method="post" enctype="multipart/form-data">
@csrf
    <input type="file" name="files[]" id="file" multiple>
<button>Save</button>
</form>
