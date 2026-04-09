export const membersSortByOptions = [
  {
    value: "startingDateDESC",
    placeholder: "Starting date new-old",
    query: "-startingDate",
    postgRESTQuery: "startingDate.desc",
  },
  {
    value: "startingDateASC",
    placeholder: "Starting date old-new",
    query: "startingDate",
    postgRESTQuery: "startingDate.asc",
  },
  {
    value: "nameASC",
    placeholder: "Name A-Z",
    query: "fullName",
    postgRESTQuery: "fullName.asc",
  },
  {
    value: "nameDESC",
    placeholder: "Name Z-A",
    query: "-fullName",
    postgRESTQuery: "fullName.desc",
  },
];

export const calendarSortByOptions = [
  {
    value: "startDateDESC",
    placeholder: "Starting date new-old",
    query: "-startTimestamp",
    postgRESTQuery: "startTimestamp.desc",
  },
  {
    value: "startDateASC",
    placeholder: "Starting date old-new",
    query: "startTimestamp",
    postgRESTQuery: "startTimestamp.asc",
  },
  {
    value: "nameASC",
    placeholder: "Name A-Z",
    query: "client",
    postgRESTQuery: "client.asc",
  },
  {
    value: "nameDESC",
    placeholder: "Name Z-A",
    query: "-client",
    postgRESTQuery: "client.desc",
  },
];

export const filterOptions = [
  {
    value: "client",
    query: "client:in",
  },
  {
    value: "position",
    query: "position:in",
  },
  {
    value: "searchMember",
    query: "fullName:contains",
  },
  {
    value: "startingDate",
    query: "startingDate:gt",
  },
];
