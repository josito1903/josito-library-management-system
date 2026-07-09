import API from "../API/api";

// Get all books
export const getBooks = () => {
    return API.get("/books");
};

// Add book
export const addBook = (book) => {
    return API.post("/books", book);
};

// Update book
export const updateBook = (id, book) => {
    return API.put(`/books/${id}`, book);
};

// Delete book
export const deleteBook = (id) => {
    return API.delete(`/books/${id}`);
};

// Search books
export const searchBooks = (keyword) => {
    return API.get(`/books/search?keyword=${keyword}`);
};