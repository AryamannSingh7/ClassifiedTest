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

export const yearListMockData = { year: [2018, 2019, 2020, 2021, 2022, 2023] };

export const spentVsCollectedMockData = {
  data: {
    id: "173",
    type: "spent_report",
    attributes: {
      spent_amount_vs_collectd: { spent_amount: 120, collectd_amount: 0 },
      unit_wise_spent_amount_vs_collectd: [
        {
          id: 89,
          unit_name: "102",
          building_id: 3,
          building_name: "First Building",
          spent_amount: 0,
          collectd_amount: 0,
        },
        {
          id: 94,
          unit_name: "301",
          building_id: 3,
          building_name: "First Building",
          spent_amount: 120,
          collectd_amount: 0,
        },
      ],
      city_wise_spent_amount_vs_collectd: [{ city: "Babara", spent_amount: 120, collectd_amount: 0 }],
    },
  },
};

export const rentVsEmptyMockData = {
  data: {
    id: "173",
    type: "rented_empty_apartment",
    attributes: {
      rented_vs_empty_unit: { rented: 2, empty: 0 },
      city_wise_rented_vs_empty_unit: [
        { city_name: "Babara", society_management_id: 5, society_management_name: "New Society", rented: 2, empty: 0 },
      ],
    },
  },
};

export const rentAndEmptyUnitListMockData = {
  data: [
    {
      id: "94",
      type: "rented_apartment_management",
      attributes: {
        apartment_name: "301",
        floor_number: 3,
        size: "1500 Sq.ft.",
        purchase_price: "$ 12000",
        configuration: "2 BHK",
        purchase_date: "2022-11-08",
        current_valuation: "$ 13000",
        society_management: {
          id: 5,
          name: "New Society",
          description: "Lorem Ipsum",
        },
        building_management: {
          id: 3,
          name: "First Building",
        },
        status: "rented",
        monthly_renting_income: "$ 120",
        unit_type: "Rented",
        address: [
          {
            id: 5,
            country: "India",
            latitude: 23.9998,
            longitude: 12.345,
            address: "1, Plaza",
            state: "Madya Pradesh",
            city: "Babara",
            region: "",
          },
        ],
      },
    },
  ],
};

export const collectedVsDueMockData = {
  data: {
    id: "173",
    type: "rent_amount_apartment",
    attributes: {
      rented_amount_collectd_vs_due: null,
      unit_wise_rented_vs_due: [
        {
          id: 89,
          unit_name: "102",
          building_id: 3,
          building_name: "First Building",
          rented_amount_collectd: 0,
          rented_amount_due: 0,
        },
        {
          id: 94,
          unit_name: "301",
          building_id: 3,
          building_name: "First Building",
          rented_amount_collectd: 0,
          rented_amount_due: 0,
        },
      ],
      city_wise_rented_vs_due: [{ city: "Babara", rented_amount_collectd: 0, rented_amount_due: 0 }],
    },
  },
};
// Customizable Area End
