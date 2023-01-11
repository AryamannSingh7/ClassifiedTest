export const complexDetailMockData = {
  id: "5",
  type: "society_management",
  attributes: {
    name: "New Society",
    description: "Lorem Ipsum",
    complex_area: "1200",
    logo: {
      url:
        "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcGtEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2260537cd1f9a4a6487722ec8d186df20909b863/dummyuser.jpg",
      content_type: "image/jpeg",
      file_name: "dummyuser.jpg",
    },
    photos: [
      {
        url:
          "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcHdEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8530e4be67452c1b810b80c9c0f8df070e32d69e/imageName.jpg",
        content_type: "image/webp",
        file_name: "imageName.jpg",
      },
    ],
    building_list: [{ building_management_id: 3, building_name: "First Building" }],
    shared_area: [
      {
        id: 1,
        name: "Lobby",
        society_management_id: 5,
        created_at: "2022-07-15T03:24:40.048Z",
        updated_at: "2022-12-09T04:46:15.542Z",
        details: "",
        total_area: "",
        currency_id: 1,
        reservation_fee: null,
      },
    ],
    documents: [
      {
        id: 23,
        created_at: "2022-08-17T04:11:48.691Z",
        updated_at: "2022-08-17T04:11:48.703Z",
        account_id: 172,
        "#\u003cActiveRecord::ConnectionAdapters::PostgreSQL::TableDefinition": null,
        document_type: "Role",
        title: "role",
        description: null,
        society_id: 5,
      },
    ],
    total_buildings: 1,
    total_units: [15],
    country: "India",
    city: "Babara",
    lat: 12.3434343,
    long: 12.121212,
  },
};

export const buildingDetailMockData = {
  id: "3",
  type: "building_management",
  attributes: {
    name: "First Building",
    description: "A-",
    per_floor_unit: 3,
    generation_methods: "101, 102, 103",
    number_of_floor: 5,
    building_area: "",
    society_management: {
      id: 5,
      name: "New Society",
      description: "Lorem Ipsum",
      created_at: "2022-07-08T04:22:30.769Z",
      updated_at: "2023-01-09T13:23:46.450Z",
      complex_area: "1200",
      maintenance_per_square_feet: null,
    },
    logo: {
      url:
        "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcHdEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8530e4be67452c1b810b80c9c0f8df070e32d69e/imageName.jpg",
      content_type: "image/webp",
      file_name: "imageName.jpg",
    },
    photos: [
      {
        url:
          "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcHdEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8530e4be67452c1b810b80c9c0f8df070e32d69e/imageName.jpg",
        content_type: "image/webp",
        file_name: "imageName.jpg",
      },
    ],
    total_floors: 5,
    total_units: 15,
    shared_area: [
      {
        id: 1,
        name: "Lobby",
        society_management_id: 5,
        created_at: "2022-07-15T03:24:40.048Z",
        updated_at: "2022-12-09T04:46:15.542Z",
        details: "",
        total_area: "",
        currency_id: 1,
        reservation_fee: null,
      },
    ],
    documents: [
      {
        id: 23,
        created_at: "2022-08-17T04:11:48.691Z",
        updated_at: "2022-08-17T04:11:48.703Z",
        account_id: 172,
        "#\u003cActiveRecord::ConnectionAdapters::PostgreSQL::TableDefinition": null,
        document_type: "Role",
        title: "role",
        description: null,
        society_id: 5,
      },
    ],
    city: "Babara",
    country: "India",
    lat: 12.3434343,
    long: 12.12121,
  },
};

export const buildingUnitListMockData = {
  apartment_managements: {
    data: [
      {
        id: "92",
        type: "custom_apartment_management",
        attributes: {
          apartment_name: "203",
          floor_number: 2,
          size: null,
          purchase_price: null,
          configuration: null,
          purchase_date: null,
          current_valuation: null,
          status: "Empty",
          monthly_renting_income: null,
          society_management: {
            id: 5,
            name: "New Society",
            description: "Lorem Ipsum",
            created_at: "2022-07-08T04:22:30.769Z",
            updated_at: "2023-01-09T13:23:46.450Z",
            complex_area: "1200",
            maintenance_per_square_feet: null,
          },
          building_management: {
            id: 3,
            name: "First Building",
            society_management_id: 5,
            description: "qretyuio fsdghj srttyuiop sdfghjk sdfghj",
            per_floor_unit: 3,
            number_of_floor: 5,
          },
          photos: [],
          owner: {
            id: 322,
            first_name: null,
            last_name: null,
            full_phone_number: "+966674587458",
            country_code: null,
            phone_number: 674587458,
            email: "ash@mailinator.com",
          },
          resident: {
            id: 322,
            first_name: null,
            last_name: null,
            full_phone_number: "+966674587458",
            country_code: null,
            phone_number: 674587458,
            email: "ash@mailinator.com",
          },
          phone_number: "+966674587458",
          family_members: 0,
          address: { city: "Babara", currency: "USD" },
        },
      },
    ],
  },
  meta: { pagination: { current_page: 1, next_page: 2, prev_page: null, total_pages: 4, total_count: 17 } },
};

export const sharedAreaMockData = {
  id: "1",
  type: "common_area",
  attributes: {
    name: "Lobby",
    details: "qwerty",
    total_area: "12300 sq. ft",
    reservation_fee: 1200,
    currency: {
      id: 1,
      currency: "USD",
      created_at: "2022-09-20T09:14:07.234Z",
      updated_at: "2022-09-20T09:14:07.234Z",
    },
    society_management_id: 5,
    photos: [
      {
        url:
          "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWtEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--dbfb6fd4c085f8eddf505b5a4b155e5634ee0017/imageName.jpg",
        content_type: "image/jpeg",
        file_name: "imageName.jpg",
      },
    ],
    floor_plan: {
      url:
        "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWtEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--dbfb6fd4c085f8eddf505b5a4b155e5634ee0017/imageName.jpg",
      content_type: "image/jpeg",
      file_name: "imageName.jpg",
    },
  },
};

export const reservationListMockData = {
  data: [
    {
      id: 1,
      type: "common_area",
      attributes: {
        reserved_by: { name: "xyz" },
        building: { building: "xyz" },
        reserved_on: "12/12/1221",
        duration: { duration: "12" },
      },
    },
  ],
};

export const chairmanUnitDetailsMockData = {
  data: {
    id: "161",
    type: "apartment_management",
    attributes: {
      apartment_name: "203",
      floor_number: 6,
      size: "1500 Sq.ft.",
      purchase_price: "$ 12000",
      configuration: "2 bHK",
      purchase_date: "2022-10-10",
      current_valuation: "$ 12121",
      status: "Occupied",
      monthly_renting_income: null,
      unit_type: null,
      request: { status: null, id: null },
      photos: [
        {
          url:
            "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbEFDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5089fecbeb482ed21e6557feab2a84b8833d629b/pexels-errin-casano-2356045.jpg",
          content_type: "image/jpeg",
          file_name: "pexels-errin-casano-2356045.jpg",
        },
      ],
      society_management: {
        id: 6,
        name: "Ti1",
        description: "",
        complex_area: "2800 sq.ft.",
      },
      building_management: {
        id: 2,
        name: "A Block 2",
        society_management_id: 4,
        description: "it's big block. qwert",
        generation_methods: "101, 102, 103",
        building_area: "1200 Sq. Ft.",
      },
      city: "indore",
      country: "india",
      region: "",
      lat: 2.56,
      long: 4.2,
      active_incidents: {
        data: [
          {
            id: "115",
            type: "incident",
            attributes: {
              common_area: {
                id: 5,
                name: "Corridor",
                society_management_id: 4,
                details: "qwerty.",
                total_area: "1200 Sq.ft.",
                currency_id: 1,
                reservation_fee: 1200,
              },
              incident_related: {
                id: 4,
                name: "Plumbing",
              },
              incident_title: "testing",
              incident_status: "Unresolved",
              mark_resolved_by_reporter: false,
              description: "image",
              reported_on: "05-Oct-2022 12:05",
              account_id: 169,
              apartment_management: { apartment_management_id: 161, building_name: "A Block 2", apartment_name: "203" },
              building_management: {
                id: 2,
                name: "A Block 2",
              },
              reported_by: {
                full_name: "demo user",
                full_phone_number: "12343434",
                email: "democ1@yopmail.com",
                date_of_birth: "2001-06-10",
              },
            },
          },
        ],
      },
      vehicle_details: {
        data: [
          {
            id: "263",
            type: "vehicle",
            attributes: {
              owner_name: "demo",
              plate_number: "Abu 1234",
              company_name: "Audi",
              model_number: "Audi A6",
              color: "White",
              status: "Approved",
              description: null,
              address: null,
              building_management: {
                id: 2,
                name: "A Block 2",
              },
              apartment_management: {
                id: 161,
                apartment_name: "203",
              },
              registration_card_copy: {
                url:
                  "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbElDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--95f65ebd87c1b0bd66f55774bd5dd3281117d870/blob",
                content_type: "image/jpeg",
                file_name: "blob",
              },
            },
          },
        ],
      },
      family_members: {
        data: [
          {
            id: "48",
            type: "family",
            attributes: {
              id: 48,
              name: "demo",
              account_id: 292,
              relation: { id: 2, name: "Father" },
              id_proof: { id: 1, name: "Aadhar" },
              id_number: "1234 1212 2323 4545",
              member_pic: {
                url:
                  "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbFFDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--dcf63199f34ad71adb01a3c32a6d34bcf4f987a9/blob",
              },
            },
          },
        ],
      },
      related_people: [
        {
          apartment_management_id: 161,
          apartment_name: "203",
          account: {
            data: {
              id: "292",
              type: "profile",
              attributes: {
                id: 292,
                full_name: { name: "demo", publilc_access: true },
                bio: { bio: "null", publilc_access: true },
                apartment_number: { apartment_number: "203", publilc_access: true },
                full_phone_number: {
                  country_code: "966",
                  phone_number: "1596234812",
                  full_phone_number: "+9661596234812",
                  publilc_access: true,
                },
                email: { email: "demoo8@yopmail.com", publilc_access: true },
                profile_pic: {
                  url:
                    "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbE1DIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d965d2cec9cabe9fed2e8dc18c9d8277f01875df/blob",
                  content_type: "image/jpeg",
                  file_name: "blob",
                },
                disable_chat: false,
              },
            },
          },
          roles: [
            {
              id: 1,
              name: "Owner",
              types: "Resident",
            },
          ],
        },
      ],
      rent_status: {
        data: {
          id: "5",
          type: "rent_history",
          attributes: {
            start_date: "2022-10-01",
            end_date: "2022-11-01",
            rent_amount: "SR 400",
            tenant_name: "John Doe",
            apartment_management_id: 161,
            received_amount: "SR 400",
            tenant: {
              id: 292,
              first_name: null,
              last_name: null,
              full_phone_number: "+9661596234812",
              email: "demoo8@yopmail.com",
            },
          },
        },
      },
      rent_history: {
        data: [
          {
            id: "5",
            type: "rent_history",
            attributes: {
              start_date: "2022-10-01",
              end_date: "2022-11-01",
              rent_amount: "SR 400",
              tenant_name: "John Doe",
              apartment_management_id: 161,
              received_amount: "SR 400",
              tenant: null,
            },
          },
        ],
      },
      owner: {
        id: 292,
        first_name: null,
        last_name: null,
        full_phone_number: "+9661596234812",
        email: "demoo8@yopmail.com",
      },
      resident: null,
    },
  },
};

export const relationListMockData = {
  relaions: [
    { id: 1, name: "Mother" },
    { id: 2, name: "Father" },
    { id: 3, name: "Son" },
    { id: 4, name: "Daughter" },
    { id: 5, name: "Mother In Law" },
    { id: 6, name: "Father in Law" },
    { id: 7, name: "Uncle" },
    { id: 8, name: "Aunt" },
    { id: 9, name: "Wife" },
  ],
};
