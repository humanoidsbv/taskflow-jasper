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
