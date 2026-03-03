import Link from "next/link";

import { ReactNode } from "react";

import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  href?: string | { query: { [key: string]: boolean } };
  variant?: "primary" | "secondary" | "special";
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const Button = ({
  children,
  type,
  href,
  variant = "primary",
  className,
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
