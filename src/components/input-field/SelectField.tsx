import { ReactNode } from "react";

import styles from "@/components/input-field/InputField.module.css";

interface SelectFieldProps {
  children: ReactNode;
  className?: string;
  name: string;
  required?: boolean;
  title: string;
}

export const SelectField = ({
  children,
  className,
  name,
  required,
  title,
}: SelectFieldProps) => {
  const classNameList = `${styles.container} ${className}`;
  return (
    <label className={classNameList}>
      <span className={styles.label}>{title}</span>
      <select className={styles.input} name={name} required={required}>
        {children}
      </select>
    </label>
  );
};
