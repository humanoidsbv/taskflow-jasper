"use client";

import { CreatedMember } from "@/types/dataTypes";
import { MemberCard } from "../member-card/MemberCard";

import styles from "./MemberCards.module.css";

interface MemberCardsProps {
  members: CreatedMember[];
}

export const MemberCards = ({ members }: MemberCardsProps) => {
  return (
    <ul>
      {members.map((entry) => {
        return <MemberCard key={entry.id} data={entry} />;
      })}
    </ul>
  );
};
