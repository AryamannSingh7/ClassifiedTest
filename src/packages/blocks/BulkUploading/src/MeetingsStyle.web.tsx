export const MeetingsStyleWeb: any = {
  faqChairman: {
    "& .navigation": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& .navigation .sub-heading": {
      fontWeight: 600,
      marginTop: 15,
      marginBottom: 15,
    },
    "& .category-box": {
      marginTop: "30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    "& .category-box .category": {
      display: "flex",
      maxWidth: "75%",
      overflowX: "auto",
      alignItems: "center",
    },
    "& .category-box .category .MuiTab-root": {
      borderRadius: "25px",
      background: "#EDF0F9",
      marginRight: "10px",
      textTransform: "capitalize",
      fontSize: "16px",
      padding: "6px 20px",
      minWidth: "auto",
      minHeight: "auto",
      color: "gray",
    },
    "& .category-box .category .MuiTab-root.active": {
      background: "#2C6DF3",
      color: "white",
    },
    "& .category-box Button": {
      borderRadius: "25px",
      background: "#FE8335",
      color: "white",
      marginRight: "10px",
      textTransform: "capitalize",
      fontSize: "16px",
      padding: "6px 20px",
      minWidth: "auto",
      minHeight: "auto",
    },
    "& .faq-box": {
      marginTop: "30px",
    },
    "& .faq-box .Mui-expanded": {
      margin: "0",
    },
    "& .faq-box .MuiAccordionSummary-root.Mui-expanded": {
      minHeight: "70px",
    },
    "& .faq-box .MuiAccordionSummary-content p": {
      fontWeight: "600",
    },
    "& .faq-box .MuiAccordionSummary-root": {
      minHeight: "70px",
    },
    "& .faq-box .MuiAccordionSummary-content": {
      justifyContent: "space-between",
    },
    "& .faq-box .icons .MuiSvgIcon-root": {
      color: "#FE8335",
      margin: "0 5px",
    },
    "& .faq-box .MuiTypography-root": {
      width: "93%",
      maxWidth: "93%",
      wordBreak: "break-word",
    },
    "& .faq-box .MuiAccordionDetails-root p.MuiTypography-root": {
      width: "100% !important",
      maxWidth: "100% !important",
      wordBreak: "break-word",
    },
    "& .faq-box .MuiAccordionDetails-root": {
      maxWidth: "100%",
      wordBreak: "break-word",
    },
    "& .faq-box .MuiAccordionSummary-content .MuiBox-root": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    "& .bottom-buttons": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "30px 0",
    },
    "& .bottom-buttons button:first-child": {
      color: "#FF4C67",
      borderColor: "#FF4C67",
      fontWeight: "600",
    },
    "& .bottom-buttons button:last-child": {
      color: "#FFFFFF",
      borderColor: "#2B6FEC",
      background: "#2B6FEC",
    },
    "& .select-category": {
      borderRadius: 4,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
    },
    "& .empty-box": {
      width: "100%",
      height: "500px",
      background: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      borderRadius: "5px",
      marginTop: "30px",
    },
  },
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
      // display: "block",
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
    },
    "& .meeting-table .table-box .MuiTableRow-root": {
      borderBottom: "1px solid #f0f0f0",
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
  },
};
