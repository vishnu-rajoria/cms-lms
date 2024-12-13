import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import InputError from "./InputError";
import DropdownInput from "./DropdownInput";

export default function AddressInputFields({ value, errors, handleSetData }) {
    // console.log("Address data is ");
    // console.log(value);
    return (
        <div className="address-fields-container p-2 py-8 grid gap-4 bg-gray-100 dark:bg-slate-700 rounded-md">
            <div className="full-width-fields grid gap-4">
                <div>
                    <InputLabel
                        htmlFor={value.addressLine1.key}
                        value={value.addressLine1.label}
                    />

                    <TextInput
                        id={value.addressLine1.key}
                        key={value.addressLine1.key}
                        type="text"
                        name={value.addressLine1.key}
                        value={value.addressLine1.value}
                        className="mt-1 block w-full"
                        isFocused={false}
                        onChange={(e) =>
                            handleSetData(
                                value.addressLine1.key,
                                e.target.value
                            )
                        }
                    />
                    <InputError
                        isInvalid={
                            value.addressLine1.fieldValidationStatus.isInvalid
                        }
                        message={
                            value.addressLine1.fieldValidationStatus.message
                        }
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor={value.addressLine2.key}
                        value={value.addressLine2.label}
                        postfix="(optional or at least 2 char)"
                    />

                    <TextInput
                        id={value.addressLine2.key}
                        key={value.addressLine2.key}
                        type="text"
                        name={value.addressLine2.key}
                        value={value.addressLine2.value}
                        className="mt-1 block w-full"
                        isFocused={false}
                        onChange={(e) =>
                            handleSetData(
                                value.addressLine2.key,
                                e.target.value
                            )
                        }
                    />

                    <InputError
                        isInvalid={
                            value.addressLine2.fieldValidationStatus.isInvalid
                        }
                        message={
                            value.addressLine2.fieldValidationStatus.message
                        }
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor={value.landmark.key}
                        value={value.landmark.label}
                        postfix="(optional or at least 2 char)"
                    />

                    <TextInput
                        id={value.landmark.key}
                        key={value.landmark.key}
                        type="text"
                        name={value.landmark.key}
                        value={value.landmark.value}
                        className="mt-1 block w-full"
                        isFocused={false}
                        onChange={(e) =>
                            handleSetData(value.landmark.key, e.target.value)
                        }
                    />

                    <InputError
                        isInvalid={
                            value.landmark.fieldValidationStatus.isInvalid
                        }
                        message={value.landmark.fieldValidationStatus.message}
                    />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <InputLabel
                        htmlFor={value.city.key}
                        value={value.city.label}
                    />

                    <TextInput
                        id={value.city.key}
                        key={value.city.key}
                        type="text"
                        name={value.city.key}
                        value={value.city.value}
                        className="mt-1 block w-full"
                        isFocused={false}
                        onChange={(e) =>
                            handleSetData(value.city.key, e.target.value)
                        }
                    />

                    <InputError
                        isInvalid={value.city.fieldValidationStatus.isInvalid}
                        message={value.city.fieldValidationStatus.message}
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor={value.state.key}
                        value={value.state.label}
                    />

                    <TextInput
                        id={value.state.key}
                        key={value.state.key}
                        type="text"
                        name={value.state.key}
                        value={value.state.value}
                        className="mt-1 block w-full"
                        isFocused={false}
                        onChange={(e) =>
                            handleSetData(value.state.key, e.target.value)
                        }
                    />

                    <InputError
                        isInvalid={value.state.fieldValidationStatus.isInvalid}
                        message={value.state.fieldValidationStatus.message}
                    />
                </div>
                <div>
                    <InputLabel
                        htmlFor={value.pincode.key}
                        value={value.pincode.label}
                    />

                    <TextInput
                        id={value.pincode.key}
                        key={value.pincode.key}
                        type="text"
                        name={value.pincode.key}
                        value={value.pincode.value}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={false}
                        onChange={(e) =>
                            handleSetData(value.pincode.key, e.target.value)
                        }
                    />

                    <InputError
                        isInvalid={
                            value.pincode.fieldValidationStatus.isInvalid
                        }
                        message={value.pincode.fieldValidationStatus.message}
                    />
                </div>
            </div>
        </div>
    );
}
