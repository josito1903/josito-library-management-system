import API from "../API/api";

export const sendMessage = (data) => {
    return API.post("/contact", data);
};

export const getMessages = () => {
    return API.get("/contact");
};

export const deleteMessage = (id) => {
    return API.delete(`/contact/${id}`);
};