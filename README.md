# 온라인 서점 북북

## 프로젝트 소개

### React, TypeScript로 만드는 온라인 서점 웹 어플리케이션

## 프로젝트 기획

### 간략한 UI / UX 디자인(Figma 제작)

#### 메인 페이지

![메인 페이지](src/assets/imgs/readmeImg/main.png)

#### 상세 페이지

![상세 페이지](src/assets/imgs/readmeImg/detailPage.png)

### 간단한 ERD 다이어그램

#### dbml 문법으로 작성한 스키마

```dbml
TABLE Book {
  id int [pk,increment]
  title varchar(255)
  author varchar(255)
  category varchar(255) [note: "도서 카테고리"]
  quantity int
  salesCount int
}

TABLE BookDetail {
  bookId int [pk,not null]
  description longtext
  tableOfContents longtext
  authorInfo longtext
  FOREIGN KEY (bookId)
}

Ref: Book.id - BookDetail.bookId [delete: cascade]
```

#### ERD 다이어그램

![간단한 ERD 다이어그램](src/assets/imgs/readmeImg/erd.png)

### 프로젝트 진행 방향

#### 데이터 통신

mock data를 사용하고 json-server를 활용한 axios 통신

#### 이미지 관리

https://picsum.photos/ 를 활용한 랜덤이미지 혹은 도서 이미지

#### 개발환경

Vite를 활용하여 React + TypeScript로 개발

#### 배포

vercel을 통해 배포
