"use client";

import { useDebouncedCallback } from "use-debounce";
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
    value ? params.set(name, value) : params.delete(name);
    router.push(`${pathName}?${params.toString()}`);
  };

  const handleSearch = useDebouncedCallback(updateParams, 300);

  return (
    <div className={styles.filters}>
      <SelectField
        name="sort_by"
        title="Sort by"
        defaultValue={searchParams.get("sort_by") ?? ""}
        onChange={(e) => updateParams("sort_by", e.currentTarget.value)}
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
        className={styles.search}
        name="search"
        type="text"
        title="Search clients"
        placeholder="search"
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) => handleSearch("search", e.currentTarget.value)}
      />
    </div>
  );
};
