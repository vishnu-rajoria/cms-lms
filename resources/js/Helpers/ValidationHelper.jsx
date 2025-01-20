//We are using validator library you can download it form
// https://www.npmjs.com/package/validator
import Joi from "joi";

//formErrors contains all the for type of for errors those are comman
export const formErrors = {
    required: "This field is required",
    email: "Please enter valid email",
    name: "Please enter a valid name [at least 3 char]",
    password: (
        <ol>
            <li>Please enter a valid password</li>
            <li>1. One lowercase</li>
            <li>2. One uppercase</li>
            <li>3. One special char [#?!@$%^&*-]</li>
            <li>4. At least 8 chracters</li>
        </ol>
    ),
    date: "Please select a valid date",
    todayAndAfter: "Only today and future date are allowed",
    pincode: "Not a valid pincode",
    address: "Not a valid address",
    notEmpty: "You can not leave this field blank",
};

/**
 * Validates the form fields based on the provided validation rules.
 *
 * @param {Object} formFieldsJSON - An object containing form fields where each key is a field name and its value is an object containing field details like value and validatorRules.
 * @returns {boolean} - Returns true if all form fields are valid, otherwise false.
 */
export function validateFormFields(formFieldsJSON) {
    let isFormValid = true;
    let formFieldsValidationStatus = {};
    Object.keys(formFieldsJSON).forEach((fieldName) => {
        let inputField = formFieldsJSON[fieldName];
        let fieldErrors = [];
        let isFieldInvalid = false;
        let fieldValidationOutput = validateField(
            inputField.validatorRules,
            inputField.value
        );
        // console.log(`Field name to validate : ${fieldName} : `);
        // console.log(fieldValidationOutput);
        if (fieldValidationOutput.isInvalid) {
            isFieldInvalid = true;
            fieldErrors = fieldValidationOutput.errors;
            isFormValid = false;
        }

        formFieldsValidationStatus[fieldName] = {
            isInvalid: isFieldInvalid,
            errors: fieldErrors,
        };
    });

    let validationDataToReturn = {
        isFormValid,
        formFieldsValidationStatus,
    };

    // console.log("For current form validation returned data is : ");
    // console.log(validationDataToReturn);
    return validationDataToReturn;
}
/**
 * This function validates a given form field value against the given validation rules.
 * @param {array} validatorRules - this is an array of strings later to be split for rule and value,
 *        each string contains a rule name and sometimes a value for example "min|5".
 *        The rules are as follows
 *            - "notEmpty"
 *            - "minLength|{length}"
 *            - "validDate"
 *            - "todayAndAfter"
 *            - "validEmail"
 *            - "validPassword"
 * @param {string} value - the value of the form field to be validated
 * @returns {object} - an object with two properties
 *        - isInvalid:boolean - true if the field is invalid false otherwise
 *        - errors:array - an array of error messages
 */
export function validateField(validatorRules, value) {
    //* fieldErrors:array --> to bag all the erros
    //* isFieldInvalid:boolearn --> to tell if this field is invalid or not
    let fieldErrors = [];
    let isFieldInvalid = false;
    let notEmpty = false;
    let fieldNotRequired = true;

    //ValidationRules:array|string -->["rule1","rule2",...]
    //* sometimes the rule also contains the value for example --> "min|5"

    if (validatorRules) {
        fieldNotRequired = validatorRules.includes("notRequired");
        notEmpty = validatorRules.includes("notEmpty");
        //validate the given value against each rules
        validatorRules.forEach((ruleString) => {
            //saperate the rule and value form the string
            let currentRule = ruleString.split("|");
            let rule = currentRule[0];
            let ruleValue = currentRule[1];
            let schema = undefined;
            //check the value against the rule

            switch (rule) {
                case "notEmpty":
                    if (value.length === 0 || value === "") {
                        isFieldInvalid = true;
                        fieldErrors.push(formErrors.notEmpty);
                    }
                    break;
                case "minLength":
                    if (value.length < parseInt(ruleValue)) {
                        if (fieldNotRequired && value.length > 0) {
                            isFieldInvalid = true;
                            fieldErrors.push(
                                `should have at least ${ruleValue} characters`
                            );
                        }
                    }
                    if (notEmpty && value.length < parseInt(ruleValue)) {
                        isFieldInvalid = true;
                        fieldErrors.push(
                            `At shoud have at least ${ruleValue} characters`
                        );
                    }
                    break;
                case "maxLength":
                    if (value.length > parseInt(ruleValue)) {
                        if (fieldNotRequired && value.length > 0) {
                            isFieldInvalid = true;
                            fieldErrors.push(
                                `should have at max ${ruleValue} characters`
                            );
                        }
                    }
                    if (notEmpty && value.length > parseInt(ruleValue)) {
                        isFieldInvalid = true;
                        fieldErrors.push(
                            `should have at max ${ruleValue} characters`
                        );
                    }
                    break;
                case "onlyDigit":
                    if (!/^\d+$/.test(value)) {
                        isFieldInvalid = true;
                        fieldErrors.push(`should have only digits`);
                    }
                    break;
                case "min":
                    if (parseInt(value) < parseInt(ruleValue) || value === "") {
                        isFieldInvalid = true;
                        fieldErrors.push(`The minimum value is ${ruleValue}`);
                    }
                    break;
                case "max":
                    if (parseInt(value) > parseInt(ruleValue)) {
                        isFieldInvalid = true;
                        fieldErrors.push(`The maximum value is ${ruleValue}`);
                    }
                    break;
                case "validDate":
                    const date = Joi.date();
                    // console.log("validating date : " + value);
                    if (date.validate(value).error || value.length <= 5) {
                        isFieldInvalid = true;
                        fieldErrors.push(formErrors.date);
                    }
                    break;
                case "todayAndAfter":
                    if (!validator.isAfter(value)) {
                        isFieldInvalid = true;
                        fieldErrors.push(formErrors.todayAndAfter);
                    }
                    break;
                case "validEmail":
                    schema = Joi.string().email({
                        tlds: { set: false },
                    });

                    if (schema.validate(value).error) {
                        isFieldInvalid = true;
                        fieldErrors.push(formErrors.email);
                    }
                    break;
                case "validPassword":
                    schema = Joi.string().pattern(
                        new RegExp(
                            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                        )
                    );

                    if (schema.validate(value).error) {
                        isFieldInvalid = true;
                        fieldErrors.push(formErrors.password);
                    }
                    break;
            }
        });

        return {
            isInvalid: isFieldInvalid,
            errors: fieldErrors,
        };
    } else {
        return {
            isInvalid: false,
            errors: [],
        };
    }
}
