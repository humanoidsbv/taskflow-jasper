export const membersSortByOptions = [
  {
    value: "startingDateDESC",
    placeholder: "Starting date new-old",
    query: "-startingDate",
  },
  {
    value: "startingDateASC",
    placeholder: "Starting date old-new",
    query: "startingDate",
  },
  {
    value: "nameASC",
    placeholder: "Name A-Z",
    query: "fullName",
  },
  {
    value: "nameDESC",
    placeholder: "Name Z-A",
    query: "-fullName",
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
