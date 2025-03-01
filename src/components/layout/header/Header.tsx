import { useEffect, useState } from "react"; // React의 useState, useEffect hook을 가져옵니다.
import { Link } from "react-router-dom"; // React Router의 Link 컴포넌트를 가져옵니다.
import styles from "./Header.module.css"; // CSS Module로 스타일을 가져옵니다.

const Header = () => {
  // 스크롤 여부를 관리하는 상태
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true); // 스크롤이 0 이상이면 isScrolled를 true로 설정
      } else {
        setIsScrolled(false); // 스크롤이 0일 때는 false로 설정
      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 컴포넌트가 처음 마운트될 때만 실행

  // 로고 클릭 시 페이지를 맨 위로 스크롤
  const handleLogoClick = () => {
    window.scrollTo(0, 0); // 스크롤을 (0, 0) 위치로 이동
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      {/* 헤더의 스타일을 isScrolled 상태에 따라 다르게 설정 */}
      <div className={styles.container}>
        {/* 로고 클릭 시 페이지를 맨 위로 스크롤하고, URL에 ?page=1&search=&option=전체 추가 */}
        <Link
          to="/?page=1&search=&option=전체"
          className={styles.logo}
          onClick={handleLogoClick} // 클릭 시 페이지 맨 위로 스크롤
        >
          {/* SVG 로고 */}
          <svg width="60" height="50" xmlns="http://www.w3.org/2000/svg">
            <polygon points="30,5 55,45 5,45" fill="black" />
            <text x="23" y="36" fontFamily="Arial" fontSize="20" fill="white">
              B
            </text>
          </svg>
          {/* 로고 텍스트 */}
          <div className={styles.logoText}>BOOKS</div>
        </Link>

        {/* 네비게이션 메뉴 */}
        <nav>
          <ul className={styles.navList}>
            {/* 메뉴 항목 */}
            <li className={styles.navItem}>
              <Link to="#">Services</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="#">Portfolio</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="#">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
