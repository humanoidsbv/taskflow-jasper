import styles from "./Button.module.css";

export const Button = ({ children, onClick }) => (
  <button onClick={onClick} className={styles.button}>
    {children}
  </button>
);
