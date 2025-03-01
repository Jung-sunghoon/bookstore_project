import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <p>© {new Date().getFullYear()} BOOKS. Made by JShoon</p>
      </div>
    </footer>
  );
};

export default Footer;
