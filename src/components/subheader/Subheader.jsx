import { Button } from "../button/Button";
import styles from "./Subheader.module.css";

export const Subheader = ({ title, subtitle, onClick }) => {
  return (
    <div className={styles.subheader}>
      <div className={styles.titles}>
        <h5>{title}</h5>
        <div className={styles.divider}></div>
        <p>{subtitle}</p>
      </div>
      <Button onClick={onClick} />
    </div>
  );
};
