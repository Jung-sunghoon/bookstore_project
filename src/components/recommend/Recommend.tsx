import { useState, useEffect } from "react";
import styles from "./Recommend.module.css";

interface BookItem {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  description: string;
}

const dummyBooks: BookItem[] = [
  {
    id: 1,
    title: "생활코딩! React 리액트 프로그래밍",
    author: "이고잉",
    coverImage:
      "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791158394202.jpg",
    description: "처음 프로그래밍을 시작하는 입문자의 눈높이에 맞춘",
  },
  {
    id: 2,
    title: "Do it! 점프 투 파이썬",
    author: "박응용",
    coverImage:
      "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791163034735.jpg",
    description: "첫날부터 실습하는 초고속 입문서",
  },
  {
    id: 3,
    title: "클린 아키텍처: 소프트웨어 구조와 설계의 원칙",
    author: "로버트 C. 마틴",
    coverImage:
      "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788966260959.jpg",
    description: "살아있는 전설이 들려주는 실용적인 소프트웨어 아키텍처 원칙",
  },
  {
    id: 4,
    title: "이펙티브 타입스크립트",
    author: "댄 밴더캄 저자",
    coverImage:
      "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788966263134.jpg",
    description: "타입스크립트의 기본 개념과 동작 원리",
  },
];

const Recommend = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1초 후에 로딩을 false로 변경
    setTimeout(() => {
      setLoading(false);
    }, 1000); // 1000ms 후 로딩 완료
  }, []);

  return (
    <section className={styles.recommendSection}>
      <h2 className={styles.recommendTitle}>Recommended</h2>

      <div className={styles.recommendGrid}>
        {dummyBooks.map((book) => (
          <div key={book.id} className={styles.recommendItem}>
            {loading ? (
              // 로딩 중일 때 스켈레톤 UI
              <div className={styles.skeleton}></div>
            ) : (
              // 실제 데이터
              <img
                src={book.coverImage}
                alt={book.title}
                className={styles.recommendImage}
              />
            )}
            <div className={styles.recommendContent}>
              <h3 className={styles.recommendTitleText}>
                {loading ? (
                  <div className={styles.skeletonText}></div>
                ) : (
                  book.title
                )}
              </h3>
              <div className={styles.recommendAuthor}>
                {loading ? (
                  <div className={styles.skeletonAuthor}></div>
                ) : (
                  book.author
                )}
              </div>
              <div className={styles.recommendDescription}>
                {loading ? (
                  <div className={styles.skeletonDescription}></div>
                ) : (
                  book.description
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recommend;
