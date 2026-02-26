"use client";

import "./Navigation.module.css";
import { NavigationItem } from "../navigation-item/NavigationItem";
import styles from "./Navigation.module.css";

import { usePathname } from "next/navigation";

const DESTINATIONS = [
  {
    id: "1",
    href: "/calendar",
    name: "Calendar",
  },
  {
    id: "2",
    href: "/team-members",
    name: "Team members",
  },
  {
    id: "3",
    href: "/projects",
    name: "Projects",
  },
  {
    id: "4",
    href: "/clients",
    name: "Clients",
  },
  {
    id: "5",
    href: "/documents",
    name: "Documents",
  },
];

export const Navigation = ({ setMenuIsOpen }) => {
  const pathName = usePathname();

  return (
    <nav>
      <ul className={styles.list}>
        {DESTINATIONS.map((destination) => (
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
