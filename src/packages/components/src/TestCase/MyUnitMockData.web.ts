export const RentHistoryMockData = {
  id: "21",
  type: "rent_history",
  attributes: {
    apartment_management_id: 97,
    end_date: "2022-11-24",
    received_amount: "$1200",
    rent_amount: "$1200",
    start_date: "2022-11-01",
    tenant_name: "John Doe",
    tenant: {
      data: {
        id: "25",
      },
    },
  },
};

export const PendingUnitMockData = {
  id: "97",
  type: "apartment_management",
  attributes: {
    apartment_name: "401",
    building_management: {
      id: 3,
      name: "First Building",
    },
    city: "Bhopal",
    configuration: "2 BHK",
    country: "India",
    current_valuation: "$ 13000",
    floor_number: 3,
    lat: 23.9998,
    long: 12.345,
    monthly_renting_income: "$ 120",
    photos: [],
    purchase_date: "2022-11-01",
    purchase_price: "$ 12000",
    region: "",
    rent_history: {
      data: [RentHistoryMockData, RentHistoryMockData],
    },
    rent_status: { data: RentHistoryMockData },
    request: {
      id: 187,
      status: "Pending",
    },
    resident: null,
    size: "1500 Sq.ft.",
    society_management: {
      id: 5,
      name: "New Society",
    },
    status: "rented",
    unit_type: "Rented",
  },
};
