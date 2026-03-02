"use client";

import { usePathname } from "next/navigation";

import { NavigationItem } from "../navigation-item/NavigationItem";
import { routes } from "@/services/destinations";

import styles from "./Navigation.module.css";

interface NavigationProps {
  onClick: () => void;
}

export const Navigation = ({ onClick }: NavigationProps) => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className={styles.list}>
        {routes.map((route) => (
          <NavigationItem
            isCurrentPage={route.href === pathname}
            key={route.id}
            link={route.href}
            onClick={onClick}
          >
            {route.name}
          </NavigationItem>
        ))}
      </ul>
    </nav>
  );
};
