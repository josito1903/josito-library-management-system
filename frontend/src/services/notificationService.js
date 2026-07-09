import API from "../API/api";

export const getNotifications = () => {
    return API.get("/notifications");
};

export const createNotification = (data) => {
    return API.post("/notifications", data);
};

export const deleteNotification = (id) => {
    return API.delete(`/notifications/${id}`);
};