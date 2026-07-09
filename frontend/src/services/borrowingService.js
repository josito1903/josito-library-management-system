import API from "../API/api";

export const getBorrowings = () => {
    return API.get("/borrowing");
};

export const borrowBook = (data) => {
    return API.post("/borrowing", data);
};

export const returnBook = (id) => {
    return API.put(`/borrowing/${id}`);
};

export const deleteBorrow = (id) => {
    return API.delete(`/borrowing/${id}`);
};