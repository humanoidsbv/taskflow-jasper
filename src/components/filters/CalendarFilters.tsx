"use client";

import { calendarSortByOptions } from "@/services/queries";
import {
  CheckboxField,
  InputField,
  SelectField,
} from "@/components/input-field";
import { useFilterParams } from "./useFilterParams";

import styles from "./CalendarFilters.module.css";

interface CalendarFiltersProps {
  clients: string[];
}

export const CalendarFilters = ({ clients }: CalendarFiltersProps) => {
  const {
    searchParams,
    updateParams,
    updateCheckboxParams,
    updateParamsDebounced,
  } = useFilterParams();
  const activeClients = (searchParams.get("client")?.split(",") ?? []).length;

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
        {calendarSortByOptions.map((option) => (
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
        name="searchClient"
        type="text"
        title="Search clients"
        placeholder="search"
        defaultValue={searchParams.get("searchClient") ?? ""}
        onChange={(e) =>
          updateParamsDebounced({
            name: "searchClient",
            value: e.currentTarget.value,
          })
        }
      />
    </div>
  );
};
