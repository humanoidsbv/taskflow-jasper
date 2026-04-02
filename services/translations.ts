export const translations = {
  calendar: {
    buttonAltText: "Add a new event",
    buttonText: "New event",
    title: "Calendar",
  },
  teamMembers: {
    buttonAltText: "Add a new member",
    buttonText: "Add member",
    title: "Team members",
  },
  default: {
    buttonAltText: "Default button component",
    buttonText: "Default",
    title: "Default Title",
  },
};

export const calendarSortByOptions = [
  {
    value: "startDateDESC",
    placeholder: "Starting date new-old",
    query: "-startTimestamp",
  },
  {
    value: "startDateASC",
    placeholder: "Starting date old-new",
    query: "startTimestamp",
  },
  { value: "nameASC", placeholder: "Name A-Z", query: "client" },
  { value: "nameDESC", placeholder: "Name Z-A", query: "-client" },
];
