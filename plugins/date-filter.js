import Vue from "vue";

Vue.filter("formatDate", (dateStr) =>
  Intl.DateTimeFormat("en-GB").format(new Date(dateStr))
);

Vue.filter("formatDateYear", (dateStr) =>
  Intl.DateTimeFormat("en-GB", {year: 'numeric'}).format(new Date(dateStr))
);