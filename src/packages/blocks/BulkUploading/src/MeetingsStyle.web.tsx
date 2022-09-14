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
    "& .top-bar .filter": {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    "& .top-bar .filter .MuiInput-underline:before": {
      border: "0",
      content: "",
      position: "unset",
    },
    "& .top-bar .filter .MuiInput-underline:after": {
      border: "0",
      content: "",
      position: "unset",
    },
    "& .top-bar .filter .select-input": {
      background: "#FFFFFF",
      border: "1px solid #F0F0F0",
      borderRadius: "8px",
      padding: "7px",
      width: "170px",
    },
    "& .top-bar .filter .input": {
      background: "#FFFFFF",
      border: "1px solid #F0F0F0",
      borderRadius: "8px",
      padding: "7px",
      width: "180px",
    },
    "& .top-bar .filter .input.date": {
      width: "170px",
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
      padding: "10px 20px",
      borderRadius: "8px",
      fontWeight: "600",
    },
    "& .top-bar .create-meeting button": {
      background: "#FC8434",
      color: "white",
      padding: "10px 20px",
      borderRadius: "5px",
      fontWeight: "600",
    },
    "& .meeting-table": {
      background: "white",
      marginTop: "20px",
      marginBottom: "20px",
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
      textTransform: "capitalize",
    },
    "& .meeting-table .table-box .ellipse": {
      maxWidth: "160px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    "& .meeting-table .table-box td.MuiTableCell-root button": {
      padding: "0px",
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
      textDecoration: "none !important",
      color: "black",
    },
    "& .scheduled": {
      background: "#D4FFE3",
      color: "#1EC65B",
      fontWeight: 600,
    },
    "& .completed": {
      background: "#F1F1F1",
      color: "#6C6C6C",
      fontWeight: 600,
    },
    "& .cancelled": {
      background: "#FFEAEA",
      color: "#F21717",
      fontWeight: 600,
    },
    "& .rejected": {
      background: "#FFEAEA",
      color: "#F21717",
      fontWeight: 600,
    },
    "& .approved": {
      background: "#D4FFE3",
      color: "#1EC65B",
      fontWeight: 600,
    },
    "& .pending": {
      background: "#FFEDE0",
      color: "#FC8434",
      fontWeight: 600,
    },
    "& .error": {
      color: "red",
    },
    "& .meeting-minute-note .MuiCard-root": {
      padding: "20px",
      boxShadow: "none",
    },
    "& .meeting-minute-note .MuiCard-root p": {
      marginBottom: "10px",
    },
    "& .meeting-minute-note .MuiCard-root .editor .public-DraftEditor-content > div": {
      minHeight: "300px",
    },
    "& .meeting-minute-note > button": {
      float: "right",
      background: "#2B6FED",
      color: "white",
      padding: "10px 20px",
      borderRadius: "5px",
      fontWeight: "600",
      marginTop: "20px",
    },
  },
  scheduledMeetingDetails: {
    "& .navigation": {
      display: "block",
    },
    "& .navigation .sub-heading": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 15,
      marginBottom: 15,
      width: "100%",
    },
    "& .navigation .sub-heading h3": {
      fontWeight: 600,
    },
    "& .navigation h5.sub-heading ": {
      fontWeight: 600,
    },
    "& .navigation .sub-heading button": {
      minWidth: "150px",
      padding: "12px 20px",
      borderRadius: "5px",
      fontWeight: "600",
      color: "white",
      background: "#2B6FED",
    },
    "& .navigation .sub-heading button.view-button": {
      minWidth: "150px",
      padding: "12px 20px",
      borderRadius: "5px",
      fontWeight: "600",
      color: "#2B6FED",
      background: "rgb(244, 247, 255)",
      border: "1px solid #2B6FED",
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
      textTransform: "capitalize",
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
      marginBottom: "100px",
      background: "white",
      borderRadius: "8px",
    },
    "& .response-box .heading": {
      padding: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "white",
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
    "& .meeting-minute-details .pdf-detail a img": {
      width: "20px",
      height: "20px",
    },
    "& .no-available .MuiCard-root": {
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "none",
    },
    "& .scheduled": {
      background: "#D4FFE3",
      color: "#1EC65B",
      fontWeight: 600,
    },
    "& .completed": {
      background: "#F1F1F1",
      color: "#6C6C6C",
      fontWeight: 600,
    },
    "& .cancelled": {
      background: "#FFEAEA",
      color: "#F21717",
      fontWeight: 600,
    },
    "& .rejected": {
      background: "#FFEAEA",
      color: "#F21717",
      fontWeight: 600,
    },
    "& .approved": {
      background: "#D4FFE3",
      color: "#1EC65B",
      fontWeight: 600,
    },
    "& .pending": {
      background: "#FFEDE0",
      color: "#FC8434",
      fontWeight: 600,
    },
    "& .accepted": {
      background: "#D4FFE3",
      color: "#1EC65B",
      fontWeight: 600,
    },
    "& .awaiting": {
      background: "#FFEDE0",
      color: "#FC8434",
    },
    "& .response-box .table-box td.MuiTableCell-root span": {
      padding: "5px 10px",
      borderRadius: "25px",
      textTransform: "capitalize",
    },
    "& .response-box .table-box th": {
      fontWeight: "600",
    },
    "& .response-box .table-bottom": {
      padding: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    "& .response-box .table-bottom .current-page": {
      color: "#FC8434",
    },
    "& .response-box .table-bottom .total-page": {
      fontWeight: "600",
    },
    "& .response-box .table-bottom .MuiPaginationItem-root.Mui-selected": {
      background: "#FC8434",
      color: "white",
      borderColor: "#FC8434",
    },
    "& .rejection-box .MuiCard-root": {
      padding: "20px",
      boxShadow: "none",
      margin: "0 0 20px",
    },
    "& .rejection-box .MuiCard-root h4": {
      color: "red",
      marginBottom: "10px",
    },
  },
  meetingList: {
    "& .top-bar": {
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
      cursor: "pointer",
      marginBottom: "18px",
      background: "#FFFFFF",
      padding: "10px 20px",
      justifyContent: "space-between",
    },
    "& .top-bar .left-icon": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    "& .top-bar .right-icon": {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    "& .right-image": {
      padding: "25px 60px",
    },
    "& a": {
      textDecoration: "none !important",
    },
    "& .select": {
      display: "flex",
      overflowX: "auto",
      alignItems: "center",
      marginBottom: "20px",
    },
    "& .select .MuiTab-root": {
      borderRadius: "20px",
      background: "#EDF0F9",
      marginRight: "10px",
      textTransform: "capitalize",
      fontSize: "16px",
      padding: "6px 20px",
      minWidth: "auto",
      minHeight: "auto",
      color: "gray",
      opacity: "1",
    },
    "& .select .MuiTab-root.active": {
      background: "#2B6FED",
      color: "white",
    },
    "& .list-box": {
      overflowY: "auto",
      overflowX: "hidden",
      height: "75vh",
    },
    "& .content-box": {
      position: "relative",
      width: "100%",
    },
    "& .content-box > .MuiGrid-root": {
      alignContent: "flex-start",
    },
    "& .meeting-list .meeting, & .templates-list .template": {
      padding: "25px",
      borderRadius: "10px",
      background: "white",
      boxShadow: "4px 0px 14px #ececec",
    },
    "& .meeting-list .meeting .header": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    "& .meeting-list .meeting .header h4": {
      wordBreak: "break-all",
      marginBottom: "15px",
    },
    "& .meeting-list .meeting .info": {
      marginBottom: "10px",
    },
    "& .meeting-list .meeting .info span": {
      color: "gray",
    },
    "& .meeting-list .meeting .info p": {
      color: "black",
    },
    "& .templates-list .template": {
      position: "relative",
      padding: "25px",
    },
    "& .templates-list .template .content": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    "& .templates-list .template .right-menu": {
      position: "absolute",
      top: 0,
      right: 0,
    },
    "& .templates-list .template .image": {
      padding: "20px",
      border: "3px solid #F8F9FE",
      display: "inline-block",
      borderRadius: "50%",
      marginBottom: "20px",
    },
    "& .templates-list .template h4": {
      textAlign: "center",
    },
    "& .decision": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: "15px",
    },
    "& .decision p": {
      color: "gray",
    },
    "& .decision .status": {
      padding: "5px 10px",
      borderRadius: "25px",
    },
    "& .decision .status-images": {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    "& .decision .status-images img": {
      cursor: "pointer",
      height: "30px",
      width: "30px",
    },
    "& .decision h6": {
      fontWeight: "600",
    },
    "& .accepted": {
      textTransform: "capitalize",
      background: "#D4FFE3",
      color: "#1EC65B",
      fontWeight: "600",
    },
    "& .rejected": {
      textTransform: "capitalize",
      background: "#FFEAEA",
      color: "#F21717",
      fontWeight: "600",
    },
  },
  meetingDetail: {
    "& .top-bar": {
      position: "sticky",
      top: "0",
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
      cursor: "pointer",
      marginBottom: "18px",
      background: "#FFFFFF",
      padding: "10px 20px",
      justifyContent: "space-between",
      borderBottom: "2px solid lightgray",
    },
    "& .top-bar .left-icon": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    "& .top-bar .left-icon span": {
      textTransform: "capitalize",
    },
    "& .right-image": {
      padding: "23px 60px",
    },
    "& a": {
      textDecoration: "none !important",
    },
    "& .content-box": {
      position: "relative",
      width: "100%",
      height: "72vh",
    },
    "& .content-box > .MuiGrid-root": {
      alignContent: "flex-start",
    },
    "& .content-box .meeting-details": {
      minHeight: "calc(100% - 10px)",
      overflowY: "auto",
      overflowX: "hidden",
    },
    "& .content-box .meeting-details iframe": {
      width: "100%",
      height: "100%",
    },
    "& .upload-button": {
      position: "sticky",
      left: 0,
      right: 0,
      bottom: 0,
      background: "#F4F7FF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px 0",
      boxShadow: "none",
    },
    "& .upload-button button": {
      background: "#2b6fec",
      color: "white",
      padding: "12px 50px",
      borderRadius: "25px",
    },
    "& .upload-button .MuiGrid-container": {
      width: "fit-content",
    },
    "& .meeting-detail": {
      marginBottom: "20px",
    },
    "& .meeting-detail .heading": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "10px",
    },
    "& .scheduled-detail .heading": {
      marginBottom: "10px",
    },
    "& .meeting-detail .heading h4": {
      fontWeight: "600",
    },
    "& .scheduled-detail .heading h4": {
      fontWeight: "600",
    },
    "& .scheduled-detail .scheduled-card p": {
      fontWeight: "600",
    },
    "& .meeting-detail .heading span": {
      padding: "5px 10px",
      borderRadius: "25px",
    },
    "& .meeting-detail .meeting-card": {
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "none",
    },
    "& .scheduled-detail .scheduled-card": {
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "none",
    },
    "& .scheduled-detail .scheduled-card .item": {
      display: "flex",
      alignItems: "flex-start",
      gap: "8px",
    },
    "& .meeting-pdf": {
      display: "block",
      background: "white",
    },
    "& .meeting-pdf .pdf-detail": {
      border: "1px solid #f0f0f0",
      borderRadius: "8px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      marginTop: "20px",
      background: "white",
    },
    "& .meeting-pdf .pdf-detail .heading": {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    "& .meeting-pdf .pdf-detail .heading h6": {
      fontWeight: "600",
    },
    "& .meeting-pdf .download-pdf img": {
      width: "20px",
      height: "20px",
    },
    "& .meeting-pdf .pdf-detail > img": {
      width: "20px",
      height: "20px",
    },
    "& .scheduled": {
      background: "#D4FFE3",
      color: "#1EC65B",
    },
    "& .completed": {
      background: "#F1F1F1",
      color: "#6C6C6C",
    },
    "& .cancelled": {
      background: "#FFEAEA",
      color: "#F21717",
    },
    "& .accepted": {
      textTransform: "capitalize",
      background: "#D4FFE3",
      color: "#1EC65B",
      fontWeight: "600",
    },
    "& .rejected": {
      textTransform: "capitalize",
      background: "#FFEAEA",
      color: "#F21717",
      fontWeight: "600",
    },
  },
};
