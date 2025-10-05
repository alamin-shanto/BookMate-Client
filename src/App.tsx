import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BooksList from "./pages/BooksList";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import BookDetail from "./pages/BookDetail";
import BorrowBook from "./pages/BorrowBook";
import BorrowSummary from "./pages/BorrowSummary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="/books" element={<BooksList />} />
        <Route path="/create-book" element={<CreateBook />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
        <Route path="/borrow/:bookId" element={<BorrowBook />} />
        <Route path="/borrow-summary" element={<BorrowSummary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
