import { BookType } from "../../types/book";
import styles from "./Book.module.css";

interface BookProps {
  books: BookType[];
}

const Book = ({ books }: BookProps) => {
  return (
    <div className={styles.bookContainer}>
      {/* <h2>책 리스트</h2> */}
      <ul>
        {books.map((book) => {
          return (
            <li key={book.id} className={styles.bookItem}>
              <div className={styles.bookImg}>
                <img
                  src="https://picsum.photos/150/200?random=1"
                  alt="도서 이미지"
                />
              </div>
              <div className={styles.bookDescription}>
                <h3 className={styles.title}>{book.title}</h3>
                <p>{book.id}</p>
                <p className={styles.author}>저자: {book.author}</p>
                <p>카테고리: {book.category}</p>
                <p>재고: {book.quantity}</p>
                <p>판매량: {book.salesCount}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Book;
