"use client";

import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface UpdateParamsInput {
  name: string;
  value: string;
}

export interface UpdateCheckboxParamsInput {
  value: string;
  remove: boolean;
  name: string;
}

const formatSearchParamList = ({
  name,
  remove,
  searchParams,
  value,
}: {
  name: string;
  remove?: boolean;
  searchParams: ReadonlyURLSearchParams;
  value: string;
}) => {
  const current = searchParams.get(name)?.split(",") ?? [];
  if (remove) return current.filter((entry) => entry !== value).join(",");
  return current.length === 0 ? value : [...current, value].join(",");
};

export const useFilterParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const updateParams = ({ name, value }: UpdateParamsInput) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) params.delete(name);
    else params.set(name, value);

    const nextParams = params.toString();
    if (nextParams === searchParams.toString()) return;

    router.replace(nextParams ? `${pathName}?${nextParams}` : pathName);
  };

  const updateCheckboxParams = ({
    value,
    remove,
    name,
  }: UpdateCheckboxParamsInput) => {
    const formattedList = formatSearchParamList({
      name,
      remove,
      searchParams,
      value,
    });
    updateParams({ name, value: formattedList });
  };

  const updateParamsDebounced = useDebouncedCallback(updateParams, 300);

  return {
    searchParams,
    updateParams,
    updateCheckboxParams,
    updateParamsDebounced,
  };
};
