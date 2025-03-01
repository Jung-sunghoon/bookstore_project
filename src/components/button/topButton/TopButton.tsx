import { useEffect, useState } from "react"; // React hook 가져오기
import styles from "./TopButton.module.css"; // 스타일을 위한 CSS 모듈

const TopButton = () => {
  // 버튼의 표시 여부를 관리하는 상태
  const [isVisible, setIsVisible] = useState(false);

  // 'TOP' 버튼 클릭 시 페이지 맨 위로 스크롤
  const topBtnClick = () => {
    window.scrollTo(0, 0); // 스크롤을 (0,0) 위치로 이동 (맨 위로)
  };

  useEffect(() => {
    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true); // 스크롤이 300px 이상일 때 버튼 표시
      } else {
        setIsVisible(false); // 스크롤이 300px 미만일 때 버튼 숨김
      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 빈 배열로 설정하여 컴포넌트가 처음 렌더링될 때만 실행

  return (
    <button
      onClick={topBtnClick} // 버튼 클릭 시 topBtnClick 함수 실행
      className={`${styles.topBtn} ${isVisible ? styles.visible : ""}`} // 스크롤 위치에 따라 클래스 변경
    >
      TOP
    </button>
  );
};

export default TopButton;
