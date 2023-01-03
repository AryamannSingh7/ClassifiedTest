// Customizable Area Start
export const expenseDetailsMockData = {
  id: "173",
  type: "expense_report",
  attributes: {
    total_expense: { expense: 0, currency: "USD" },
    category_wise_expense: [{ title: "Electricity", currency: "USD", expenses: 0 }],
    unit_wise_expense: [
      { id: 94, unit_name: "301", building_id: 3, building_name: "First Building", currency: "USD", expenses: 0 },
      { id: 89, unit_name: "102", building_id: 3, building_name: "First Building", currency: "USD", expenses: 0 },
    ],
    city_wise_expenses: [
      {
        city_name: "Bhopal",
        society_management_id: 5,
        society_management_name: "New Society",
        currency: "USD",
        expenses: 0,
      },
    ],
  },
};

export const expenseCategoryMockData = [
  {
    id: 1,
    title: "Plumbing",
  },
  {
    id: 2,
    title: "Electricity",
  },
];

export const unitDetailsMockData = {
  id: "94",
  attributes: {
    apartment_name: "301",
    building_management: {
      id: 3,
      name: "First Building",
    },
  },
};

export const myExpenseListMockData = [
  {
    id: "7",
    attributes: {
      id: 7,
      expense_date: "2022-12-01",
      expense_amount: "$ 120",
      issue_title: "Issue: Plumbing",
      expense_category_id: 5,
      address: {
        currency: "SR",
      },
      building_management: {
        id: 3,
        name: "First Building",
      },
      apartment_management: {
        id: 94,
        apartment_name: "301",
      },
      society_management: {
        id: 5,
        name: "New Society",
      },
      resolved_by: "John Doe",
      summary: "Issue: Plumbing ",
      expense_category: {
        id: 5,
        title: "Renovation",
      },
    },
  },
];
// Customizable Area End
