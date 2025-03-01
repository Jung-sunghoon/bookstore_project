import { useState, useEffect } from "react"; // React hook 가져오기
import styles from "./PlusButton.module.css"; // 스타일을 위한 CSS 모듈

// 후에 책 추가 혹은 수정 시 사용
const PlusButton = () => {
  // 스크롤 상태 관리: 300px 이상일 때 버튼 표시
  const [isScrolled, setIsScrolled] = useState(false);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsScrolled(true); // 스크롤이 300px 이상일 때 버튼 표시
    } else {
      setIsScrolled(false); // 스크롤이 300px 미만일 때 버튼 숨김
    }
  };

  useEffect(() => {
    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 빈 배열로 설정하여 컴포넌트가 처음 렌더링될 때만 실행

  return (
    <button
      className={`${styles.plusBtn} ${isScrolled ? styles.scrolled : ""}`} // 스크롤 위치에 따라 클래스를 동적으로 변경
    >
      +
    </button>
  );
};

export default PlusButton;
