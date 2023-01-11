// Customizable Area Start
import React from "react";

export const handleFilterValue = (state: any) => {
  if (state.selectedFilter === "year") {
    return state.selectedYear;
  } else if (state.selectedFilter === "quarter") {
    return state.selectedQuarter;
  } else {
    return state.selectedMonth;
  }
};

export const handleSelectFilterList = (state: any) => {
  if (state.selectedFilter === "year") {
    return state.yearList.map((year: number) => {
      return (
        <option value={year} key={year}>
          {year}
        </option>
      );
    });
  } else if (state.selectedFilter === "quarter") {
    return state.quarterList.map((quarter: any) => {
      return (
        <option value={quarter.value} key={quarter.value}>
          {quarter.key}
        </option>
      );
    });
  } else {
    return state.monthList.map((month: number) => {
      return (
        <option value={month} key={month}>
          {month}
        </option>
      );
    });
  }
};
// Customizable Area End
