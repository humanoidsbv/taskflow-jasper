import styles from "./InfoField.module.css";

interface InfoFieldProps {
  title: string;
  value: string;
}

export const InfoField = ({ title, value }: InfoFieldProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
};
