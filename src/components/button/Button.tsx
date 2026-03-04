import Link from "next/link";

import { ReactNode } from "react";

import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  href?: string | { query: { [key: string]: boolean } };
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary";
}

export const Button = ({
  children,
  className,
  href,
  type,
  variant = "primary",
}: ButtonProps) => {
  const classNameList = `${styles.button} ${styles[variant]} ${className}`;
  return href ? (
    <Link className={classNameList} href={href}>
      {children}
    </Link>
  ) : (
    <button className={classNameList} type={type}>
      {children}
    </button>
  );
};
