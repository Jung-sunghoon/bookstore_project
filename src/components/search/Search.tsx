import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Search.module.css";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const options = ["전체", "제목", "저자"];
  const navigate = useNavigate();

  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운을 감지할 ref 생성

  // 드롭다운 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const location = useLocation(); // URL을 얻기 위해 사용

  // URL 쿼리 파라미터에서 search와 option 값을 가져오는 useEffect
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("search") || "";
    const option = queryParams.get("option") || "전체";

    setSearchQuery(query);
    setSelectedOption(option);
  }, [location.search]); // URL이 변경될 때마다 실행

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log(`검색 카테고리: ${selectedOption}, 검색어: ${searchQuery}`);
      alert(`"${searchQuery}"에 대한 ${selectedOption} 검색을 시작합니다.`);
      navigate(`?page=1&search=${searchQuery}&option=${selectedOption}`);
    } else {
      alert(`전체 검색을 시작합니다.`);
      navigate("/?page=1");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <section className={styles.searchSection}>
      <div className={styles.dropdownWrapper} ref={dropdownRef}>
        <button onClick={toggleDropdown} className={styles.dropdownButton}>
          {selectedOption}
          <span className={styles.dropdownButtonIcon}>
            {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
          </span>
        </button>

        {isOpen && (
          <ul className={styles.dropdownList}>
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionSelect(option)}
                className={styles.dropdownItem}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyDown}
          className={styles.searchInput}
        />
        <FaSearch className={styles.searchIcon} size={16} />
      </div>
    </section>
  );
};

export default Search;
