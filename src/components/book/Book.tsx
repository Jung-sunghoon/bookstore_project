import { BookType } from "../../types/book"; // BookType을 불러옵니다.
import { Link } from "react-router-dom"; // 페이지 이동을 위한 Link 컴포넌트를 불러옵니다.
import styles from "./Book.module.css"; // 스타일을 위한 CSS 모듈을 불러옵니다.

interface BookProps {
  books: BookType[]; // BookType 배열로 책 데이터 리스트를 받습니다.
  loading: boolean; // 로딩 상태를 받아옵니다.
}

const Book = ({ books, loading }: BookProps) => {
  const placeholderImageUrl =
    "https://dummyimage.com/50x70/cccccc/ffffff.png&text=Book"; // 이미지 로드 실패 시 대체할 placeholder URL

  if (loading) {
    return (
      <div>
        {[...Array(10)].map((_, index) => (
          <div key={index} className={styles.skeletonLoading}>
            {/* 스켈레톤 로딩 UI */}
            <div className={styles.bookImage}>
              <div className={styles.bookImagePlaceholder}></div>{" "}
              {/* 책 이미지 스켈레톤 */}
            </div>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`${styles.skeletonItem} ${
                  i === 0 ? styles.skeletonItemLarge : ""
                }`} // 텍스트 영역 스켈레톤
              ></div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {books.map((book) => {
        return (
          <Link
            key={book.id} // 책 id를 key로 사용하여 고유한 요소로 만듭니다.
            to={`/bookdetail/${book.id}`} // 책 상세 페이지로 이동할 URL 설정
            className={styles.bookContainer} // 책 항목에 대한 스타일
          >
            <div className={styles.bookImage}>
              <img
                src={`https://picsum.photos/id/${book.id}/150/200`} // 책 이미지 URL (책 id를 이용해 랜덤 이미지)
                alt="도서 이미지"
                className={styles.bookImgDetail}
                onError={(e) => (e.currentTarget.src = placeholderImageUrl)} // 이미지 로드 실패 시 대체 이미지 표시
              />
            </div>
            <div className={styles.bookContent}>{book.title}</div>{" "}
            {/* 책 제목 */}
            <div className={styles.bookContent}>{book.author}</div> {/* 저자 */}
            <div className={styles.bookContent}>{book.category}</div>{" "}
            {/* 책 카테고리 */}
            <div className={styles.bookContent}>{book.quantity}</div>{" "}
            {/* 재고 수량 */}
            <div className={styles.bookContent}>{book.salesCount}</div>{" "}
            {/* 판매 수 */}
          </Link>
        );
      })}
    </div>
  );
};

export default Book;
