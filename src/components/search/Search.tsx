import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Search.module.css";

const Search = () => {
  const queryParams = new URLSearchParams(location.search);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    queryParams.get("option") || "통합검색"
  );
  const [searchTerm, setSearchTerm] = useState(queryParams.get("search") || "");
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const options = ["통합검색", "제목", "저자"];

  // 드롭다운을 토글하는 함수
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 메뉴 외부 클릭 시 드롭다운을 닫는 함수
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 쿼리 파라미터가 변경될 때 상태 초기화
  useEffect(() => {
    const search = queryParams.get("search");
    const option = queryParams.get("option");

    if (search !== null) {
      setSearchTerm(search);
    } else {
      setSearchTerm("");
    }

    if (option !== null) {
      setSelectedOption(option);
    } else {
      setSelectedOption("통합검색");
    }
  }, [location.search]);

  // 옵션을 선택하는 함수
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false); // 선택 후 드롭다운 닫기
    // 선택된 옵션에 따라 placeholder 업데이트
  };

  // 엔터 키 누를 시 검색 수행
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`?search=${searchTerm}&option=${selectedOption}`);
    }
  };

  return (
    <div className={styles.searchSection}>
      {/* 드롭다운 버튼 */}
      <div ref={menuRef} className={styles.dropDownContainer}>
        <button
          onClick={toggleMenu}
          className={`${styles.dropDownBtn} ${isOpen ? styles.open : ""}`}
        >
          {selectedOption}
        </button>

        {/* 드롭다운 메뉴 */}
        {isOpen && (
          <ul className={styles.dropDownMenu}>
            {options
              .filter((option: string) => option !== selectedOption)
              .map((option: string) => (
                <li
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className={styles.dropDownItem}
                >
                  {option}
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* 검색 입력 및 링크 */}
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색어를 입력하시오."
        className={styles.searchInput}
        onKeyDown={handleKeyDown}
      />
      <Link to={`?search=${searchTerm}&option=${selectedOption}`}>
        <button className={styles.searchBtn}>검색</button>
      </Link>
    </div>
  );
};

export default Search;
