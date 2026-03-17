import styles from "./InputField.module.css";

interface InputFieldProps {
  title: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export const InputField = ({
  title,
  name,
  type,
  placeholder,
  required,
  className,
}: InputFieldProps) => {
  const classNameList = `${styles.labelField} ${className}`;
  return (
    <label className={classNameList}>
      <span className={styles.label}>{title}</span>
      <input
        className={styles.inputField}
        name={name}
        placeholder={placeholder}
        type={type}
        required={required}
      />
    </label>
  );
};
