import { ReactNode } from "react";

import styles from "@/components/input-field/InputField.module.css";

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  className?: string;
  defaultValue?: string;
  name: string;
  title: string;
}

export const SelectField = ({
  children,
  className,
  defaultValue,
  name,
  title,
  ...props
}: SelectFieldProps) => {
  const classNameList = `${styles.container} ${className}`;

  return (
    <label className={classNameList}>
      <span className={styles.label}>{title}</span>
      <select
        className={styles.input}
        name={name}
        defaultValue={defaultValue}
        key={defaultValue}
        {...props}
      >
        {children}
      </select>
    </label>
  );
};
