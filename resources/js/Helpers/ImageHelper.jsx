const baseURL = import.meta.env.VITE_APP_URL;

export const getStudentImageURL = (studentId, fileName) => {
    if (fileName) {
        return (
            baseURL +
            `/storage/students/profile_pics/${studentId}/md/md-${fileName}`
        );
    } else {
        return baseURL + `/storage/dummy/profile_pic.jpg`;
    }
};

export const getGroupIconURL = (groupId, fileName) => {
    if (fileName) {
        return baseURL + `/storage/groups/${groupId}/group_icon/${fileName}`;
    } else {
        return baseURL + `/storage/dummy/profile_pic.jpg`;
    }
};
