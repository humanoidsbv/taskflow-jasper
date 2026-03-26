"use client";

import Form from "next/form";
import { InputField } from "../input-field/InputField";
import { SelectField } from "../input-field/SelectField";

import styles from "./CalendarFilters.module.css";
import { useSearchParams } from "next/navigation";

const sortByOptions = [
  { value: "nameASC", placeholder: "Name A-Z" },
  { value: "nameDESC", placeholder: "Name Z-A" },
  { value: "startDateDESC", placeholder: "Starting date new-old" },
  { value: "startDateASC", placeholder: "Starting date old-new" },
];

const clientOptions = [{ value: "Heineken", placeholder: "Heineken" }];

export const CalendarFilters = () => {
  const searchParams = useSearchParams();

  const updateParams = () => {};

  return (
    <div className={styles.filters}>
      <SelectField name="sortBy" title="Sort by">
        {sortByOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
            defaultValue={searchParams.get(`${option.value}`) || ""}
          >
            {option.placeholder}
          </option>
        ))}
      </SelectField>
      <SelectField name="client" title="Client">
        <option value="select">Select client(s)</option>
        {clientOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.placeholder}
          </option>
        ))}
      </SelectField>
      <InputField
        name="date"
        type="date"
        title="Date"
        placeholder="Select date range"
        onChange={updateParams}
      />
      <InputField
        name="search"
        type="text"
        title="Search clients"
        placeholder="search"
      />
    </div>
  );
};
