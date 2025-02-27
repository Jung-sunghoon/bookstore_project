# 온라인 서점 북북

## 프로젝트 소개

## 프로젝트 기획

### UI / UX 디자인(Figma 제작)

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
  id int [pk, increment]
  book_id int [not null]
  description longtext
  table_of_contents text
  author_info longtext
  FOREIGN KEY (book_id)
}

Ref: Book.id - BookDetail.book_id [delete: cascade]
```

#### ERD 다이어그램

![간단한 ERD 다이어그램](src/assets/imgs/readmeImg/erd.png)
