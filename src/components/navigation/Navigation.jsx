"use client";

import { usePathname } from "next/navigation";

import { NavigationItem } from "../navigation-item/NavigationItem";

import styles from "./Navigation.module.css";

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
