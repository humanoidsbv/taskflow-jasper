"use client";

import { RefObject } from "react";

import styles from "./InputField.module.css";

interface InputFieldProps {
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  inputRef?: RefObject<HTMLInputElement | null>;
  max?: string;
  min?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  title: string;
  type: string;
}

export const InputField = ({
  className,
  defaultValue,
  disabled,
  inputRef,
  max,
  min,
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
        defaultValue={defaultValue}
        disabled={disabled}
        max={max}
        min={min}
        name={name}
        placeholder={placeholder}
        type={type}
        required={required}
        ref={inputRef}
      />
    </label>
  );
};
