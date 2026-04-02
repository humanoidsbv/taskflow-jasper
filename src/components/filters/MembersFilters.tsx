"use client";

import {
  CheckboxField,
  InputField,
  SelectField,
} from "@/components/input-field";
import { membersSortByOptions } from "@/services/queries";

import styles from "./MembersFilters.module.css";
import { useFilterParams } from "./useFilterParams";

interface MembersFiltersProps {
  positions: string[];
  clients: string[];
}

export const MembersFilters = ({ positions, clients }: MembersFiltersProps) => {
  const {
    searchParams,
    updateParams,
    updateCheckboxParams,
    updateParamsDebounced,
  } = useFilterParams();
  const activeClients = (searchParams.get("client")?.split(",") ?? []).length;
  const activePositions = (searchParams.get("position")?.split(",") ?? [])
    .length;

  return (
    <div className={styles.filters}>
      <SelectField
        name="sortBy"
        title="Sort by"
        defaultValue={searchParams.get("sortBy") ?? ""}
        onChange={(e) =>
          updateParams({
            name: "sortBy",
            value: e.currentTarget.value,
          })
        }
      >
        {membersSortByOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
            defaultValue={searchParams.get(`${option.value}`) || ""}
          >
            {option.placeholder}
          </option>
        ))}
      </SelectField>
      <CheckboxField
        title="Position"
        options={positions}
        name="position"
        onCheck={updateCheckboxParams}
        numberChecked={activePositions}
      />
      <CheckboxField
        title="Client"
        options={clients}
        name="client"
        onCheck={updateCheckboxParams}
        numberChecked={activeClients}
      />
      <InputField
        name="startingDate"
        type="date"
        title="Date"
        placeholder="Select date range"
        defaultValue={searchParams.get("startingDate") ?? ""}
        onChange={(e) =>
          updateParams({
            name: "startingDate",
            value: e.currentTarget.value,
          })
        }
      />
      <InputField
        className={styles.search}
        name="searchMember"
        type="text"
        title="Search members"
        placeholder="search"
        defaultValue={searchParams.get("searchMember") ?? ""}
        onChange={(e) =>
          updateParamsDebounced({
            name: "searchMember",
            value: e.currentTarget.value,
          })
        }
      />
    </div>
  );
};
