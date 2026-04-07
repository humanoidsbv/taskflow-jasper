"use client";

import { RefObject } from "react";

import styles from "./InputField.module.css";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  defaultValue?: string;
  error?: string[] | undefined;
  inputRef?: RefObject<HTMLInputElement | null>;
  name: string;
  title: string;
}

export const InputField = ({
  className,
  defaultValue,
  error,
  inputRef,
  name,
  title,
  ...props
}: InputFieldProps) => {
  const classNameList = `${styles.container} ${className}`;
  return (
    <label className={classNameList}>
      <span className={styles.label}>{title}</span>
      <input
        className={styles.input}
        defaultValue={defaultValue}
        name={name}
        ref={inputRef}
        {...props}
      />
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
};
