import styles from "./InfoField.module.css";

interface InfoFieldProps {
  className?: string;
  title: string;
  value: string;
}

export const InfoField = ({ className, title, value }: InfoFieldProps) => {
  const classNameList = `${styles.container} ${className}`;
  return (
    <div className={classNameList}>
      <span className={styles.title}>{title}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
};
