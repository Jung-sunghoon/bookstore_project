import BookLists from "../../components/bookLists/BookLists";
import PlusButton from "../../components/button/plusButton/PlusButton";
import TopButton from "../../components/button/topButton/TopButton";
import Recommend from "../../components/recommend/Recommend";
import Search from "../../components/search/Search";

const Main = () => {
  return (
    <>
      <Search />
      <Recommend />
      <BookLists />
      <PlusButton />
      <TopButton />
    </>
  );
};

export default Main;
