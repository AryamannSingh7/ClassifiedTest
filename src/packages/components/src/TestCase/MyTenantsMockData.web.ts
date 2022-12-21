// Customizable Area Start
export const tenantMockData = {
  id: "30",
  type: "tenant_resquest",
  attributes: {
    id: 30,
    tenant_type: "Individual",
    name: "John Doe",
    phone_number: "+971-953495635",
    email: "JohnDowthy3@yopmail.com",
    account_id: 173,
    building_management_id: 3,
    apartment_management_id: 94,
    id_proof_id: 1,
    id_number: "1234 1212 2323 4546",
    id_expectation_date: "2022-12-01",
    tenant: {
      id: 426,
      full_phone_number: "+971-953495635",
      email: "JohnDowthy3@yopmail.com",
      status: "regular",
      full_name: "John Doe",
    },
    city: "Bhopal",
    building_management: {
      id: 3,
      name: "First Building",
      description: "A-",
    },
    apartment_management: {
      id: 94,
      apartment_name: "301",
    },
    id_proof: { id: 1, name: "Aadhar" },
    account: {
      id: 173,
      full_phone_number: "+9661234567878",
      phone_number: 1234567878,
      email: "demoo3@yopmail.com",
      full_name: "Test User",
    },
    tenant_id_copy: {
      url:
        "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcEVEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0a831d4c0b639d3e011fda8ec45742d4c9b42362/sample.pdf",
      file_name: "sample.pdf",
    },
    tenant_documents: [
      {
        url:
          "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcElEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e0b287b10a0ce0ade655dfa911d21784e82c4300/sample.pdf",
        file_name: "sample.pdf",
      },
    ],
    contract: null,
    lease_issued: false,
  },
};

export const fileMockData = {
  lastModified: 1660036467840,
  lastModifiedDate: "Tue Aug 09 2022 14:44:27 GMT+0530 (India Standard Time)",
  name: "sample.pdf",
  size: 3028,
  type: "application/pdf",
  webkitRelativePath: "",
};

export const myTenantForm = {
  tenantType: "company",
  tenantName: "john doe",
  tenantCountryCode: "+971",
  tenantMobile: "1234567890",
  tenantEmail: "j.w@yopmail.com",
  building: "1",
  unit: "1",
  idType: "1",
  idNumber: "1111 1111 1111 1111",
  idDate: "12/12/1221",
  idCard: [fileMockData],
  otherDocument: [fileMockData],
};

// Customizable Area End
