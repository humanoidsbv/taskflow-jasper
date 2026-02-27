"use client";

import { usePathname } from "next/navigation";

import destinations from "@/services/destinations.json" with { type: "json" };
import { NavigationItem } from "../navigation-item/NavigationItem";

import styles from "./Navigation.module.css";

export const Navigation = ({ setMenuIsOpen }) => {
  const pathName = usePathname();

  return (
    <nav>
      <ul className={styles.list}>
        {destinations.map((destination) => (
          <NavigationItem
            isCurrentPage={destination.href === pathName}
            key={destination.id}
            link={destination.href}
            setMenuIsOpen={setMenuIsOpen}
          >
            {destination.name}
          </NavigationItem>
        ))}
      </ul>
    </nav>
  );
};
