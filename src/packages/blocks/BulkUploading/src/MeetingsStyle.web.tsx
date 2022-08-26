export const MeetingsStyleWeb: any = {
  scheduledMeeting: {
    "& .navigation": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& .navigation .sub-heading": {
      fontWeight: 600,
      marginTop: 15,
      marginBottom: 15,
    },
    "& .top-bar": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    "& .top-bar .filter .select-input": {
      background: "#FFFFFF",
      border: "1px solid #F0F0F0",
      borderRadius: "8px",
      marginRight: "18px",
      padding: "10px 15px",
      width: "200px",
    },
    "& .top-bar .filter .select-input .MuiSelect-root ": {
      background: "#FFFFFF",
    },
    "& .top-bar .filter .select-input:before": {
      border: 0,
    },
    "& .top-bar .filter .select-input:after": {
      border: 0,
    },
    "& .top-bar .filter button": {
      background: "#2B6FED",
      color: "white",
      padding: "12px 20px",
      borderRadius: "8px",
    },
    "& .top-bar .create-meeting button": {
      background: "#FC8434",
      color: "white",
      padding: "12px 20px",
      borderRadius: "5px",
    },
    "& .meeting-table": {
      background: "white",
      marginTop: "20px",
      borderRadius: "8px",
      fontFamily: "Century Gothic",
    },
    "& .meeting-table .table-top": {
      padding: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    "& .meeting-table .table-top h3": {
      fontWeight: "600",
    },
    "& .meeting-table .table-top .search-box": {
      display: "flex",
      alignItems: "center",
      border: "1px solid lightgray",
      padding: "5px 10px",
      borderRadius: "8px",
    },
    "& .meeting-table .table-top .search-box svg": {
      fill: "gray",
    },
    "& .meeting-table .table-top .search-box .search": {
      marginLeft: "5px",
    },
    "& .meeting-table .table-box": {
      margin: "20px",
      width: "-webkit-fill-available",
    },
    "& .meeting-table .table-box .MuiTableCell-root": {
      border: "0px",
    },
    "& .meeting-table .table-box th.MuiTableCell-root": {
      fontWeight: "600",
    },
    "& .meeting-table .table-box td.MuiTableCell-root": {
      paddingTop: "10px",
      paddingBottom: "10px",
    },
    "& .meeting-table .table-box .MuiTableHead-root": {
      borderBottom: "1px solid #f0f0f0",
      fontFamily: "Century Gothic !important",
    },
    "& .meeting-table .table-box .MuiTableHead-root th": {
      fontFamily: "Century Gothic !important",
    },
    "& .meeting-table .table-box .MuiTableRow-root": {
      borderBottom: "1px solid #f0f0f0",
      fontFamily: "Century Gothic",
    },
    "& .meeting-table .table-box .MuiTableRow-root td": {
      fontFamily: "Century Gothic",
    },
    "& .meeting-table .table-box .ellipse": {
      maxWidth: "160px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    "& .meeting-table .table-box td.MuiTableCell-root span": {
      padding: "5px 10px",
      borderRadius: "25px",
    },
    "& .meeting-table .table-bottom": {
      padding: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    "& .meeting-table .table-bottom .current-page": {
      color: "#FC8434",
    },
    "& .meeting-table .table-bottom .total-page": {
      fontWeight: "600",
    },
    "& .meeting-table .table-bottom .MuiPaginationItem-root.Mui-selected": {
      background: "#FC8434",
      color: "white",
      borderColor: "#FC8434",
    },
    "& a": {
      textDecoration: "none",
      color: "black",
    },
  },
  scheduledMeetingDetails: {
    "& .navigation": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& .navigation .sub-heading": {
      fontWeight: 600,
      marginTop: 15,
      marginBottom: 15,
    },
    "& a": {
      textDecoration: "none",
      color: "black",
    },
    "& .meeting-detail-box": {
      background: "white",
      marginBottom: "50px",
      marginTop: "25px",
      borderRadius: "8px",
    },
    "& .meeting-detail-box .meeting-top": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px",
    },
    "& .meeting-detail-box .meeting-top h3": {
      fontWeight: "600",
    },
    "& .meeting-detail-box .meeting-top span": {
      padding: "5px 12px",
      borderRadius: "25px",
    },
    "& .meeting-detail-box .meeting-details": {
      padding: "20px",
    },
    "& .meeting-detail-box .meeting-details h4": {
      marginBottom: "20px",
    },
    "& .meeting-detail-box .meeting-details .items": {
      borderBottom: "1px solid #f0f0f0",
      padding: "15px 0",
    },
    "& .meeting-detail-box .meeting-details .items p": {
      display: "inline-block",
      fontWeight: "600",
    },
    "& .response-box": {
      padding: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "100px",
      background: "white",
      borderRadius: "8px",
    },
    "& .response-box h3": {
      fontWeight: "600",
    },
    "& .response-box .status": {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: "24px",
    },
    "& .response-box .status .item": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    },
    "& .response-box .status p span": {
      fontWeight: "600",
    },
    "& .button-box": {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: "50px",
      gap: "20px",
    },
    "& .button-box button": {
      minWidth: "150px",
      padding: "12px 20px",
      borderRadius: "5px",
      fontWeight: "600",
    },
    "& .button-box button.cancel": {
      border: "1px solid #2B6FED",
      color: "#2B6FED",
    },
    "& .button-box button.edit": {
      color: "white",
      background: "#2B6FED",
    },
    "& .meeting-minute-details": {
      padding: "20px",
    },
    "& .meeting-minute-details .resolution": {
      minHeight: "500px",
    },
    "& .meeting-minute-details .pdf-detail": {
      border: "1px solid #f0f0f0",
      borderRadius: "8px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      marginTop: "20px",
    },
    "& .meeting-minute-details .pdf-detail .heading": {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    "& .meeting-minute-details .pdf-detail .heading h6": {
      fontWeight: "600",
    },
    "& .meeting-minute-details .pdf-detail > img": {
      width: "20px",
      height: "20px",
    },
  },
};
