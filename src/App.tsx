import { Route, Routes } from "react-router-dom";
import BookLists from "./components/bookLists/BookLists";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<BookLists />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
