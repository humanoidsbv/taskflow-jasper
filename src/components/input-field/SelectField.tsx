import { ReactNode } from "react";

import styles from "@/components/input-field/InputField.module.css";

interface SelectFieldProps {
  title: string;
  name: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

export const SelectField = ({
  title,
  name,
  required,
  className,
  children,
}: SelectFieldProps) => {
  const classNameList = `${styles.labelField} ${className}`;
  return (
    <label className={classNameList}>
      <span className={styles.label}>{title}</span>
      <select className={styles.inputField} name={name} required={required}>
        {children}
      </select>
    </label>
  );
};
