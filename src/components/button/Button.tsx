import { ReactNode } from "react";

import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "special";
  hasIconPadding?: boolean;
}

export const Button = ({
  children,
  hasIconPadding,
  onClick,
  variant = "primary",
}: ButtonProps) => (
  <button
    onClick={onClick}
    className={`${styles.button} ${styles[variant]} ${hasIconPadding ? styles.hasIconPadding : ""}`.trim()}
  >
    {children}
  </button>
);
