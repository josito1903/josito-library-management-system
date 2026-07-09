import API from "../API/api";

export const getStudents = () => {
    return API.get("/students");
};

export const getStudent = (id) => {
    return API.get(`/students/${id}`);
};

export const updateStudent = (id, data) => {
    return API.put(`/students/${id}`, data);
};

export const deleteStudent = (id) => {
    return API.delete(`/students/${id}`);
};