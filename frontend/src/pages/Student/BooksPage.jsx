import { useState, useContext } from "react";
import "./Bookpage.css";
import { LibraryContext } from "../../context/LibraryContext";

function BooksPage() {
  const { addBorrowRecord } = useContext(LibraryContext);

  const [books, setBooks] = useState([
    {
      id: 1,
      title: "JavaScript Basics",
      author: "John Smith",
      category: "Programming",
      quantity: 10,
    },
    {
      id: 2,
      title: "React Guide",
      author: "David Miller",
      category: "Web Development",
      quantity: 5,
    },
  ]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [search, setSearch] = useState("");

  const addBook = () => {
    if (!title || !author || !category || !quantity) {
      alert("Please fill all fields");
      return;
    }

    const newBook = {
      id: books.length + 1,
      title,
      author,
      category,
      quantity: Number(quantity),
    };

    setBooks([...books, newBook]);

    setTitle("");
    setAuthor("");
    setCategory("");
    setQuantity("");
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const borrowBook = (book) => {
    if (book.quantity <= 0) {
      alert("Book not available");
      return;
    }

    const updatedBooks = books.map((b) =>
      b.id === book.id
        ? { ...b, quantity: b.quantity - 1 }
        : b
    );

    setBooks(updatedBooks);

    const today = new Date();

    const returnDate = new Date();
    returnDate.setDate(today.getDate() + 7);

    addBorrowRecord({
      id: Date.now(),
      student: "Josito",
      book: book.title,
      borrowDate: today.toLocaleDateString(),
      returnDate: returnDate.toLocaleDateString(),
      duration: "7 Days",
      fine: "₹0",
      status: "Borrowed",
    });

    alert(`${book.title} borrowed successfully`);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="books-page">
      <h1>📚 Library Books</h1>

      <div className="book-form">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button onClick={addBook}>
          Add Book
        </button>
      </div>

      <input
        className="search-box"
        type="text"
        placeholder="Search Book..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Delete</th>
            <th>Borrow</th>
          </tr>
        </thead>

        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.quantity}</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteBook(book.id)}
                >
                  Delete
                </button>
              </td>

              <td>
                <button
                  className="borrow-btn"
                  onClick={() => borrowBook(book)}
                >
                  Borrow
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BooksPage;



// import { useState, useEffect, useContext } from "react";
// import "./Bookpage.css";
// import { LibraryContext } from "../../context/LibraryContext";

// import {
//   getBooks,
//   addBook,
//   updateBook,
//   deleteBook,
// } from "../../services/bookService";

// function BooksPage() {
//   const { addBorrowRecord } = useContext(LibraryContext);

//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   const isAdmin = user?.role === "admin";

//   const [books, setBooks] = useState([]);

//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [category, setCategory] = useState("");
//   const [quantity, setQuantity] = useState("");

//   const [search, setSearch] = useState("");

//   const [editingId, setEditingId] = useState(null);

//   // =========================
//   // LOAD BOOKS
//   // =========================

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       const response = await getBooks();

//       if (response.data.success) {
//         setBooks(response.data.books);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Failed to load books.");
//     }
//   };

//   // =========================
//   // ADD BOOK
//   // =========================

//   const handleAddBook = async () => {
//     try {
//       if (!title || !author || !category || !quantity) {
//         return alert("Please fill all fields.");
//       }

//       await addBook({
//         title,
//         author,
//         category,
//         quantity,
//       });

//       setTitle("");
//       setAuthor("");
//       setCategory("");
//       setQuantity("");

//       fetchBooks();

//       alert("Book added successfully.");

//     } catch (error) {
//       console.error(error);
//       alert("Unable to add book.");
//     }
//   };

//   // =========================
//   // DELETE BOOK
//   // =========================

//   const handleDeleteBook = async (id) => {
//     try {

//       const confirmDelete = window.confirm(
//         "Delete this book?"
//       );

//       if (!confirmDelete) return;

//       await deleteBook(id);

//       fetchBooks();

//       alert("Book deleted.");

//     } catch (error) {
//       console.error(error);
//       alert("Unable to delete book.");
//     }
//   };

//   // =========================
//   // EDIT BOOK
//   // =========================

//   const handleEditBook = (book) => {
//     setEditingId(book._id);

//     setTitle(book.title);
//     setAuthor(book.author);
//     setCategory(book.category);
//     setQuantity(book.quantity);
//   };

//   // =========================
//   // UPDATE BOOK
//   // =========================

//   const handleUpdateBook = async () => {
//     try {

//       await updateBook(editingId, {
//         title,
//         author,
//         category,
//         quantity,
//       });

//       setEditingId(null);

//       setTitle("");
//       setAuthor("");
//       setCategory("");
//       setQuantity("");

//       fetchBooks();

//       alert("Book updated.");

//     } catch (error) {
//       console.error(error);
//       alert("Unable to update book.");
//     }
//   };