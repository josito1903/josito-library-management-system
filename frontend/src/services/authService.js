import API from "../API/api";

// Register
export const signup = (userData) => {
    return API.post("/auth/signup", userData);
};

// Login
export const signin = (userData) => {
    return API.post("/auth/signin", userData);
};

// Logout
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};