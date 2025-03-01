import Footer from "./footer/Footer";
import Header from "./header/Header";
import { ReactNode } from "react";
import styles from "./Layout.module.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
