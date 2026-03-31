"use client";

import { useDebouncedCallback } from "use-debounce";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { InputField } from "../input-field/InputField";
import { SelectField } from "../input-field/SelectField";
import { sortByOptions } from "@/services/translations";

import styles from "./CalendarFilters.module.css";
import { CheckboxField } from "../input-field/CheckboxField";
import { useState } from "react";

interface CalendarFiltersProps {
  clients: string[];
}

export const CalendarFilters = ({ clients }: CalendarFiltersProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const [activeClients, setActiveClients] = useState<string[]>([]);

  const updateClient = (value: string, remove: boolean) => {
    const formattedList = formatSearchParamList("client", value, remove);
    setActiveClients(formattedList.length > 0 ? formattedList.split(",") : []);
    return updateParams("client", formattedList);
  };

  const formatSearchParamList = (
    name: string,
    value: string,
    remove?: boolean,
  ) => {
    const current = searchParams.get(name)?.split(",") ?? [];

    if (remove) {
      return current?.filter((entry) => entry !== value).join(",");
    }

    return current.length === 0 ? value : [...current, value].join(",");
  };

  const updateParams = (name: string, value: string, append?: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) {
      params.delete(name);
    }
    if (value && append) {
      params.append(name, value);
    }
    if (value && !append) {
      params.set(name, value);
    }

    const next = params.toString();
    if (next === searchParams.toString()) return;
    router.replace(`${pathName}?${next}`);
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
      <CheckboxField
        title="Client"
        options={clients}
        name="client"
        onCheckClient={updateClient}
        activeList={activeClients}
      />
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
