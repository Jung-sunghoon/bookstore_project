import { useState, useEffect } from "react"; // React의 useState와 useEffect를 불러옵니다.
import { useLocation, useNavigate } from "react-router-dom"; // 페이지 URL 및 네비게이션을 위한 hook
import BookData from "../../mock/bookData.json"; // 책 데이터 모킹
import { BookType } from "../../types/book"; // Book 타입 가져오기
import Book from "../book/Book"; // Book 컴포넌트 가져오기
import { Pagination } from "antd"; // 페이지네이션 컴포넌트
import styles from "./BookLists.module.css"; // CSS 모듈 가져오기

const BookLists = () => {
  const [books] = useState<BookType[]>(BookData); // 책 데이터 상태 관리
  const location = useLocation(); // 현재 URL 정보 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate hook

  // URL에서 페이지, 검색어, 옵션 파라미터 가져오기
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search")?.toLowerCase() || ""; // 검색어 처리
  const searchOption = queryParams.get("option") || "전체"; // 검색 옵션 (전체, 제목, 저자)
  const pageFromUrl = queryParams.get("page") || "1"; // 현재 페이지 번호, 기본값은 1

  // 페이지 상태 관리
  const [currentPage, setCurrentPage] = useState<number>(parseInt(pageFromUrl));
  const pageSize = 10; // 한 페이지에 표시할 항목 수
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  // 책 데이터 필터링 (검색어와 검색 옵션에 맞게 필터링)
  const filteredBooks = books.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(searchTerm); // 제목 검색
    const authorMatch = book.author.toLowerCase().includes(searchTerm); // 저자 검색

    if (searchOption === "전체") return titleMatch || authorMatch; // 옵션이 전체일 경우 제목과 저자 모두 검색
    if (searchOption === "제목") return titleMatch; // 옵션이 제목일 경우 제목만 검색
    if (searchOption === "저자") return authorMatch; // 옵션이 저자일 경우 저자만 검색
    return false; // 그 외의 경우에는 검색하지 않음
  });

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (page: number) => {
    setLoading(true); // 페이지 전환 시 로딩 상태로 설정
    setCurrentPage(page); // 현재 페이지를 새로 설정

    // URL에 페이지 파라미터 업데이트
    navigate(`?page=${page}&search=${searchTerm}&option=${searchOption}`);
  };

  // 현재 페이지에 해당하는 데이터만 슬라이싱해서 가져오기
  const startIndex = (currentPage - 1) * pageSize;
  const currentBooks = filteredBooks.slice(startIndex, startIndex + pageSize);

  // 데이터가 준비되면 로딩 상태를 false로 변경
  useEffect(() => {
    if (currentBooks.length > 0) {
      setTimeout(() => {
        setLoading(false); // 1초 후 로딩 상태 변경
      }, 1000);
    }
  }, [filteredBooks]); // 필터링된 책 목록이 변경될 때마다 실행

  // 페이지 변경 시 맨 위로 스크롤 이동
  useEffect(() => {
    window.scrollTo(0, 700); // 700px 위치로 스크롤
  }, [currentPage]); // currentPage가 변경될 때마다 실행

  // URL의 page 파라미터 변경 시 currentPage 상태 업데이트
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page");
    if (page) {
      setCurrentPage(parseInt(page)); // page 파라미터가 있을 경우 해당 페이지로 설정
    }
  }, [location.search]); // location.search가 변경될 때마다 실행

  // 검색어가 변경되면 페이지를 1로 설정
  useEffect(() => {
    if (searchTerm) {
      setCurrentPage(1); // 검색어가 바뀌면 첫 페이지로 이동
    }
  }, [searchTerm]); // searchTerm이 변경될 때마다 실행

  // 페이지 로드 시 URL에 ?page=1이 없으면 추가
  useEffect(() => {
    if (location.search === "") {
      // 브라우저가 처음 로드될 때 URL에 기본값을 설정
      window.history.replaceState(null, "", `?page=1&search=&option=전체`);
    }
  }, []); // 컴포넌트가 처음 마운트될 때 한 번만 실행

  return (
    <div className={styles.BookListsContainer}>
      {/* 필터링된 책 목록을 페이지에 맞게 보여줌 */}
      <Book books={currentBooks} loading={loading} />

      {/* 페이지네이션 컴포넌트 */}
      <Pagination
        className={styles.pagination}
        align="center"
        current={currentPage}
        pageSize={pageSize}
        total={filteredBooks.length}
        onChange={handlePageChange} // 페이지 변경 시 호출되는 함수
      />
    </div>
  );
};

export default BookLists;
