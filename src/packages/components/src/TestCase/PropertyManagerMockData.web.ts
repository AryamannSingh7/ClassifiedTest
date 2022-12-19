export const propertyManagerMockData = {
  data: {
    id: "38",
    type: "property_manager_request",
    attributes: {
      id: 38,
      company_name: "google",
      name: "JohnDeo",
      email: "johndow147@yopmail.com",
      mobile_number: "+1284-14245672",
      id_number: "1234 1212 2323 4546",
      id_expiration_date: "2022-12-01",
      properties: {
        data: [
          {
            id: "27",
            type: "property",
            attributes: {
              id: 27,
              building_management_id: 3,
              apartment_management_id: 89,
              start_date: "2022-12-01",
              end_date: "2022-12-30",
              fees_type: "Fixed Percentage",
              fixed_persentage_of_rent: "10 %",
              account_id: 173,
              property_manager_request_id: 38,
              building_management: {
                id: 3,
                name: "First Building",
              },
              apartment_management: {
                id: 89,
                apartment_name: "102",
              },
            },
          },
          {
            id: "28",
            type: "property",
            attributes: {
              id: 28,
              building_management_id: 3,
              apartment_management_id: 89,
              start_date: "2022-12-01",
              end_date: "2022-12-30",
              fees_type: "Fixed Percentage",
              fixed_persentage_of_rent: "10 %",
              account_id: 173,
              property_manager_request_id: 38,
              building_management: {
                id: 3,
                name: "First Building",
              },
              apartment_management: {
                id: 89,
                apartment_name: "102",
              },
            },
          },
        ],
      },
      id_proof: { id: 1, name: "Aadhar" },
      image: {
        url:
          "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb2dEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--99a5fc4d7dbe095d90dd11c37d60f835bcb28b61/sample.pdf",
      },
    },
  },
};

export const idTypeListMockData = { relaions: [{ id: 1, name: "Aadhar" }] };

export const propertyListMockData = {
  data: [
    {
      id: "27",
      type: "property",
      attributes: {
        id: 27,
        building_management_id: 3,
        apartment_management_id: 89,
        start_date: "2022-12-01",
        end_date: "2022-12-30",
        fees_type: "Fixed Percentage",
        fixed_persentage_of_rent: "10 %",
        account_id: 173,
        property_manager_request_id: 38,
        building_management: {
          id: 3,
          name: "First Building",
        },
        apartment_management: {
          id: 89,
          apartment_name: "102",
        },
      },
    },
  ],
};

export const complexDetailsMockData = {
  complex: {
    id: 5,
    name: "New Society",
  },
  complex_address: {
    id: 5,
    country: "India",
    latitude: 23.9998,
    longitude: 12.345,
    address: "1, Plaza",
    state: "Madya Pradesh",
    city: "Bhopal",
    region: "",
  },
};

export const newRequestListMockData = {
  data: [
    {
      id: "237",
      type: "property_manager_new_request",
      attributes: {
        country: "India",
        city: "Bhopal",
        building_management: {
          id: 3,
          name: "First Building",
        },
        apartment_management: {
          data: {
            id: "94",
            type: "apartment_management",
            attributes: {
              apartment_name: "301",
            },
          },
        },
        status: "Requested",
        property_manager: {
          id: 37,
          company_name: "qwerty",
          name: "JohnDoe",
          email: "john1298@yopmail.com",
          mobile_number: "+963-142356777",
          id_proof_id: null,
          id_number: null,
          id_expiration_date: null,
          account_id: 424,
          created_at: "2022-12-13T09:43:27.218Z",
          updated_at: "2022-12-13T09:43:27.218Z",
        },
      },
    },
  ],
};

export const buildingListMockData = {
  buildings: [
    {
      id: 3,
      name: "First Building",
    },
  ],
};

export const unitListMockData = {
  apartments: [
    {
      id: 94,
      apartment_name: "301",
    },
    {
      id: 89,
      apartment_name: "102",
    },
  ],
};

export const propertyFormMockData = [
  {
    country: "India",
    city: "Bhopal",
    buildingId: "3",
    unitId: "3",
    buildingName: "DFG",
    unitName: "123",
    startDate: "12-12-2022",
    endDate: "12-01-2023",
    feeType: "Fixed Payment",
    rent: "1200",
  },
];

export const localStorageMock = (() => {
  let store: any = {};

  return {
    getItem(key: any) {
      return store[key] || null;
    },
    setItem(key: any, value: any) {
      store[key] = value.toString();
    },
    removeItem(key: any) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();
