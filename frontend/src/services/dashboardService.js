import API from "../API/api";

export const getDashboard = () => {
    return API.get("/dashboard");
};