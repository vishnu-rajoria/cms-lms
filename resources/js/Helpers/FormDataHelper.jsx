// Function to get database field by form field
export function getDBFieldByFormField(DBFieldsAndFormField, formField) {
    console.log(`formField inside the getDBFieldByFormField method`);
    console.log(formField);
    let dbFieldSelected = undefined;
    let DBFields = Object.keys(DBFieldsAndFormField);

    // Iterate through DBFields to find matching formField
    for (let i = 0; i < DBFields.length; i++) {
        if (DBFieldsAndFormField[DBFields[i]] === formField) {
            dbFieldSelected = DBFields[i];
            break;
        }
    }
    return dbFieldSelected;
}

// Function to get form field by database field
export function getFormFieldByDBField(DBFieldsAndFormField,DBField) {
    return DBFieldsAndFormField[DBField];
}
