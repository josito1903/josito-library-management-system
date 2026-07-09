import API from "../API/api";

export const getProfile = () => {
    return API.get("/profile");
};

export const updateProfile = (data) => {
    return API.put("/profile", data);
};

export const uploadProfileImage = (formData) => {
    return API.post("/profile/upload", formData);
};