import { BrowserRouter, Routes, Route } from "react-router-dom";

import BooksList from "./pages/BooksList";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import BookDetail from "./pages/BookDetail";
import BorrowBook from "./pages/BorrowBook";
import BorrowSummary from "./pages/BorrowSummary";
import Layout from "./components/Layout";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/borrow/:bookId" element={<BorrowBook />} />
          <Route path="/borrow-summary" element={<BorrowSummary />} />
        </Route>
        <Route
          path="*"
          element={
            <div className="text-center text-red-500 text-xl mt-8">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
