"use client";

import { InputField } from "../input-field/InputField";
import { SelectField } from "../input-field/SelectField";

import styles from "./CalendarFilters.module.css";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const sortByOptions = [
  { value: "nameASC", placeholder: "Name A-Z" },
  { value: "nameDESC", placeholder: "Name Z-A" },
  { value: "startDateDESC", placeholder: "Starting date new-old" },
  { value: "startDateASC", placeholder: "Starting date old-new" },
];

const clientOptions = [{ value: "Heineken", placeholder: "Heineken" }];

export const CalendarFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const updateParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <div className={styles.filters}>
      <SelectField
        name="sortBy"
        title="Sort by"
        defaultValue={searchParams.get("sortBy") ?? ""}
        onChange={(e) => updateParams("sortBy", e.currentTarget.value)}
      >
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
      <SelectField
        name="client"
        title="Client"
        defaultValue={searchParams.get("client") ?? ""}
        onChange={(e) => updateParams("client", e.currentTarget.value)}
      >
        <option value="">Select client(s)</option>
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
        defaultValue={searchParams.get("date") ?? ""}
        onChange={(e) => updateParams("date", e.currentTarget.value)}
      />
      <InputField
        name="search"
        type="text"
        title="Search clients"
        placeholder="search"
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) => updateParams("search", e.currentTarget.value)}
      />
    </div>
  );
};
