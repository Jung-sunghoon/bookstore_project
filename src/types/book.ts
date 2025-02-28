export interface BookType {
  id: number;
  title: string;
  author: string;
  category: string;
  quantity: number;
  salesCount: number;
}

export type BookDetail = {
  bookId: BookType["id"];
  summary: string;
  tableOfContents: string[];
  authorInfo: string;
};
