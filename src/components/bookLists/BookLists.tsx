import { useState } from "react";
import { useLocation } from "react-router-dom";
import BookData from "../../mock/bookData.json";
// import BookDetailData from "../../mock/bookDetailData.json";
import {
  // BookDetail,
  BookType,
} from "../../types/book";
import Book from "../book/Book";

const BookLists = () => {
  const [books] = useState<BookType[]>(BookData);
  // const [bookDetails] = useState<BookDetail[]>(BookDetailData);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search")?.toLowerCase() || "";
  const searchOption = queryParams.get("option") || "통합검색";

  const filteredBooks = books.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(searchTerm);
    const authorMatch = book.author.toLowerCase().includes(searchTerm);

    if (searchOption === "통합검색") return titleMatch || authorMatch;
    if (searchOption === "제목") return titleMatch;
    if (searchOption === "저자") return authorMatch;
    return false;
  });

  return (
    <div>
      <Book books={filteredBooks} />
    </div>
  );
};

export default BookLists;
