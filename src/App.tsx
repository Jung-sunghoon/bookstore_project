import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Main from "./pages/main/Main";
import DetailPage from "./pages/detail/DetailPage";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/bookdetail/:bookId" element={<DetailPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
