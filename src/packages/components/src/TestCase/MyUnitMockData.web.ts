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
    photos: [
      {
        content_type: "image/jpeg",
        file_name: "1130536.jpg",
        url:
          "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbzBEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--237f76f30f6a8ac25b0ea60fde1925a80d3012bb/1130536.jpg",
      },
    ],
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

export const TenantDetailsMockData = {
  id: "25",
  type: "profile",
  attributes: {
    id: 25,
    full_name: { name: "hello", publilc_access: true },
    bio: { bio: null, publilc_access: true },
    apartment_number: { apartment_number: null, publilc_access: true },
    full_phone_number: {
      country_code: "91",
      phone_number: "7011965610",
      full_phone_number: "+917011965610",
      publilc_access: true,
    },
    email: { email: "hello@gmail.com", publilc_access: true },
    gender: { gender: null, publilc_access: true },
    date_of_birth: { date_of_birth: null, publilc_access: true },
    hobbies: { hobbies: ["cricket"], publilc_access: true },
    website: [
      { twitter_link: null, publilc_access: true },
      { instagram_link: null, publilc_access: true },
      { fb_link: null, publilc_access: true },
      { snapchat_link: null, publilc_access: true },
    ],
    families: { families: null, publilc_access: true },
    buildings: { buildings: null },
    profile_pic: null,
    disable_chat: false,
  },
};

export const buildingListMockData = {
  data: {
    buildings: [
      {
        id: 3,
        name: "First Building",
        society_management_id: 5,
        description: "A-",
      },
    ],
  },
};

export const floorListMockData = { floors: [2, 1, 3, 4, 5] };

export const unitListMockData = {
  apartment_managements: [
    {
      id: 98,
      apartment_name: "402",
    },
    {
      id: 88,
      apartment_name: "101",
    },
    {
      id: 95,
      apartment_name: "302",
    },
  ],
};
