"use client";

import "./Navigation.module.css";
import { NavigationItem } from "../navigation-item/NavigationItem";
import styles from "./Navigation.module.css";
import destinations from "@/services/destinations.json" with { type: "json" };

import { usePathname } from "next/navigation";

export const Navigation = ({ setMenuIsOpen }) => {
  const pathName = usePathname();

  return (
    <nav>
      <ul className={styles.list}>
        {destinations.map((destination) => (
          <NavigationItem
            link={destination.href}
            key={destination.id}
            setMenuIsOpen={setMenuIsOpen}
            isCurrentPage={destination.href === pathName}
          >
            {destination.name}
          </NavigationItem>
        ))}
      </ul>
    </nav>
  );
};
