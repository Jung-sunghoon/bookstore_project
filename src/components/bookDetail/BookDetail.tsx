import { useParams } from "react-router-dom";
import styles from "./BookDetail.module.css";
import bookDetailData from "../../mock/bookDetailData.json";
import bookData from "../../mock/bookData.json";
import { useEffect, useState } from "react";

// 로딩 스켈레톤 UI 컴포넌트
const Skeleton = () => (
  <div className={styles.skeletonContainer}>
    <div className={styles.skeletonImage}></div>
    <div className={styles.skeletonTextWrapper}>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonText}></div>
    </div>
  </div>
);

// 책 상세 컴포넌트
const BookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

  // URL의 bookId에 해당하는 책 정보를 찾음
  const book = bookData.find((b) => b.id === parseInt(bookId!));
  const bookDetail = bookDetailData.find((b) => b.bookId === parseInt(bookId!));

  // 데이터 로딩 후 실행되는 useEffect
  useEffect(() => {
    setTimeout(() => {
      if (book && bookDetail) {
        setIsLoading(false); // 1초 후 로딩 상태를 false로 설정
      }
    }, 1000);
    window.scrollTo(0, 0); // 페이지가 로드될 때 맨 위로 스크롤
  }, []);

  // 책 정보나 책 상세 정보가 없으면 에러 메시지 반환
  if (!book || !bookDetail) {
    return <div>책 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      {/* 책 정보 표시 */}
      <div className={styles.bookInfo}>
        <div className={styles.bookImageWrapper}>
          {isLoading ? (
            <Skeleton /> // 로딩 중일 때 스켈레톤 UI 표시
          ) : (
            <img
              src={`https://picsum.photos/id/${book.id}/300/400`}
              alt={book.title}
              className={styles.bookImage}
            />
          )}
        </div>
        <div className={styles.textInfo}>
          {isLoading ? (
            <></>
          ) : (
            <>
              <h1 className={styles.title}>{book.title}</h1>
              <p className={styles.author}>저자: {book.author}</p>
              <p className={styles.quantity}>재고 수량: {book.quantity}</p>
              <p className={styles.salesCount}>판매 수: {book.salesCount}</p>
            </>
          )}
        </div>
      </div>

      {/* 책 상세 설명 및 목차 */}
      <div className={styles.bookDetail}>
        {isLoading ? (
          <div className={styles.skeletonItemLarge}></div> // 로딩 중일 때 상세 내용 스켈레톤 UI
        ) : (
          <>
            <p className={styles.bookDetailDescription}>상품 설명</p>
            <hr />
            <h2>책 소개</h2>
            <hr />
            <p>{bookDetail.summary}</p>
            <hr />
            <h3>분야</h3>
            <p>{book.category}</p>
            <hr />
            <h3>목차</h3>
            <ul>
              {bookDetail.tableOfContents.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <hr />
            <h3>저자 정보</h3>
            <p>{bookDetail.authorInfo}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
