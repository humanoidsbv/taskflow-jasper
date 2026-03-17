import styles from "./InputField.module.css";

interface InputFieldProps {
  className?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  title: string;
  type: string;
}

export const InputField = ({
  className,
  name,
  placeholder,
  required,
  title,
  type,
}: InputFieldProps) => {
  const classNameList = `${styles.container} ${className}`;
  return (
    <label className={classNameList}>
      <span className={styles.label}>{title}</span>
      <input
        className={styles.input}
        name={name}
        placeholder={placeholder}
        type={type}
        required={required}
      />
    </label>
  );
};
