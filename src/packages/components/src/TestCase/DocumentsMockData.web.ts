// Customizable Area Start
export const buildingDocumentCountMockData = {
  building_plan_count: 0,
  guideline_count: 2,
  policy_count: 7,
  resolution_count: 6,
  role_count: 1,
};

export const personalDocumentCountMockData = {
  rent_contract: 2,
  unit_plan: 7,
  other_document: 6,
};

export const documentMockData = {
  id: "23",
  type: "building_document",
  attributes: {
    id: 23,
    title: "role",
    account_id: 172,
    images: [
      {
        id: 152,
        url:
          "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBWmc9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b521c6a9636741f96edfa1e0541680bd550d4fa2/file-example_PDF_500_kB.pdf",
        download_url:
          "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBWmc9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b521c6a9636741f96edfa1e0541680bd550d4fa2/file-example_PDF_500_kB.pdf?disposition=attachment",
        file_name: "file-example_PDF_500_kB.pdf",
      },
    ],
  },
};

export const resolutionMockData = {
  id: "64",
  type: "resolution",
  attributes: {
    id: 64,
    title: "test 2",
    created_at: "2022-08-22T06:37:17.384Z",
    attachments: [
      {
        url:
          "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBY289IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--eaeda3e7300ec1d20093fa455a1498ff450c411b/sample.pdf",
        content_type: "application/pdf",
        file_name: "sample.pdf",
      },
    ],
    meeting_date_time: "10-07-21 14:43",
    buidling_name: "A Block",
    meeting: {
      id: 31,
      title: "Vehicle2",
      date: "2021-07-10T00:00:00.000Z",
      time: "2021-07-10T14:43:17.000Z",
      agenda: "Social Service1",
      place: "Rasstlhow",
      status: "completed",
      meeting_mins_notes: "",
      meeting_mins_status: "pending",
      account_id: 176,
      building_management_id: 1,
      society_management_id: 5,
      manager_id: null,
      meeting_type: null,
      meeting_attandees_type: [],
    },
    meeting_mins_pdf: {
      url:
        "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBY289IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--eaeda3e7300ec1d20093fa455a1498ff450c411b/sample.pdf",
    },
  },
};

export const meetingMinuteMockData = {
  id: "18",
  type: "meeting",
  attributes: {
    title: "Vehicle2",
    agenda: "Social Service1",
    place: "Rasstlhow",
    status: "completed",
    meeting_mins_status: "pending",
    account_id: 176,
    meeting_type: null,
    meeting_mins_notes: "",
    meeting_date_time: "10-07-2021 14:43",
    meeting_schedule_detail: {
      id: 18,
      scheduled_by: "vishwas",
      scheduled_on: "16-08-2022 13:11",
      meeting_id: 18,
    },
    meeting_cancel_detail: null,
    meeting_responses: { awaited: 0, accepted: 0, rejected: 0 },
    meeting_reject_note: null,
    building: null,
    meeting_mins_writer: null,
    meeting_mins_pdf: null,
    meeting_response: null,
    joinees: [],
    meeting_groups: { meeting_group: [], meeting_owner: false, meeting_resident: false },
  },
};
// Customizable Area End
