"use client";

import { calendarSortByOptions } from "@/services/translations";
import { InputField, SelectField, CheckboxField } from "../input-field";
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
        name="sort_by"
        title="Sort by"
        defaultValue={searchParams.get("sort_by") ?? ""}
        onChange={(e) =>
          updateParams({
            name: "sort_by",
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
        name="date"
        type="date"
        title="Date"
        placeholder="Select date range"
        defaultValue={searchParams.get("date") ?? ""}
        onChange={(e) =>
          updateParams({
            name: "date",
            value: e.currentTarget.value,
          })
        }
      />
      <InputField
        className={styles.search}
        name="search"
        type="text"
        title="Search clients"
        placeholder="search"
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) =>
          updateParamsDebounced({
            name: "search",
            value: e.currentTarget.value,
          })
        }
      />
    </div>
  );
};
