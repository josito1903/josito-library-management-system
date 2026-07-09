import { createContext, useState } from "react";

export const LibraryContext = createContext();

export function LibraryProvider({ children }) {
  const [borrowings, setBorrowings] = useState([]);

  const addBorrowRecord = (record) => {
    setBorrowings((prev) => [...prev, record]);
  };

  const returnBook = (id) => {
    setBorrowings((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Returned",
              returnDate: new Date().toLocaleDateString(),
            }
          : item
      )
    );
  };

  return (
    <LibraryContext.Provider
      value={{
        borrowings,
        addBorrowRecord,
        returnBook,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}