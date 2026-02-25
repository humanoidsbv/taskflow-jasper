import "./Navigation.module.css";
import { NavigationItem } from "../navigation-item/NavigationItem";
import Link from "next/link";

const DESTINATIONS = [
  {
    id: "1",
    href: "/rome/",
    name: "Rome",
  },
  {
    id: "2",
    href: "/luxemburg/",
    name: "Luxemburg",
  },
  {
    id: "3",
    href: "/delft/",
    name: "Delft",
  },
];

export const Navigation = () => {
  return (
    <nav>
      <ul>
        {DESTINATIONS.map((destination) => (
          <NavigationItem link={destination.href} key={destination.id}>
            {destination.name}
          </NavigationItem>
        ))}
      </ul>
    </nav>
  );
};
