import { ReactNode } from "react";

import styles from "@/components/input-field/InputField.module.css";

interface SelectFieldProps {
  children: ReactNode;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  multiple?: boolean;
  name: string;
  required?: boolean;
  title: string;
}

export const SelectField = ({
  children,
  className,
  defaultValue,
  disabled,
  multiple,
  name,
  required,
  title,
}: SelectFieldProps) => {
  const classNameList = `${styles.container} ${className}`;

  return (
    <label className={classNameList}>
      <span className={styles.label}>{title}</span>
      <select
        className={styles.input}
        disabled={disabled}
        multiple={multiple}
        name={name}
        required={required}
        defaultValue={defaultValue}
        key={defaultValue}
      >
        {children}
      </select>
    </label>
  );
};
