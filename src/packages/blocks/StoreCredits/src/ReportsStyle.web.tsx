export const ReportsStyleWeb: any = {
  reportChairman: {
    "& .navigation": {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    "& .navigation p": {
      marginBottom: "12px",
    },
    "& .navigation h5": {
      fontWeight: 600,
    },
    "& a": {
      textDecoration: "none !important",
    },
    "& .report-items": {
      boxShadow: "4px 0px 14px #e9e9e9",
      borderRadius: "8px",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      alignItems: "flex-start",
    },
    "& .report-items .img-box": {
      borderRadius: "50%",
      padding: "20px",
      border: "2px solid #f7f9fe",
    },
    "& .report-items .color-btn": {
      borderRadius: "25px",
      background: "#FFEDE0",
      color: "#FC8434",
      fontWeight: 600,
      // fontSize: "16px",
    },
  },
  reportList: {
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
    "& .top-bar .filter .select-input .MuiSelect-root": {
      background: "#FFFFFF",
      // color: "#A2A2A2",
    },
    "& ::placeholder": {
      color: "black !important",
      opacity: "1",
    },
    "& :-ms-input-placeholder": {
      color: "black !important",
      opacity: "1",
    },
    "& ::-ms-input-placeholder": {
      color: "black !important",
      opacity: "1",
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
      width: "250px",
    },
    "& .meeting-table .table-top .search-box svg": {
      fill: "gray",
    },
    "& .meeting-table .table-top .search-box .search": {
      marginLeft: "5px",
      width: "100%",
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
      // fontFamily: "Century Gothic !important",
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
    "& .meeting-table .table-box td.MuiTableCell-root li span": {
      borderRadius: 0,
      padding: 0,
    },
    "& .meeting-table .table-box td.MuiTableCell-root span.ga-meeting": {
      padding: "5px 10px",
      borderRadius: "25px",
      background: "#2B6FED",
      color: "white",
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
    "& .meeting-minute-note .note-button": {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: "20px",
    },
    "& .meeting-minute-note .note-button button.preview": {
      background: "#2B6FED",
      color: "white",
      padding: "10px 20px",
      borderRadius: "5px",
      fontWeight: "600",
      marginTop: "20px",
      width: "150px",
    },
    "& .meeting-minute-note .note-button button.submit": {
      border: "1px solid #2B6FED",
      color: "2B6FED",
      padding: "10px 20px",
      borderRadius: "5px",
      fontWeight: "600",
      marginTop: "20px",
      width: "150px",
    },
    "& .expense-right-heading .sort-by select": {
      border: "1px solid #eaeaea",
      color: "black",
      fontWeight: 600,
      padding: "12px 20px",
      borderRadius: "8px",
      width: "125px",
    },
    "& .expense-right-heading": {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
  },
  reportDetails: {
    "& .navigation": {
      display: "block",
    },
    "& .navigation .sub-heading": {
      fontWeight: 600,
      marginTop: 5,
    },
    "& .navigation .sub-heading-box": {
      marginTop: 15,
      marginBottom: 15,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    "& .navigation .sub-heading-box select": {
      width: "109px",
      height: "40px",
      borderRadius: "8px",
      background: "#ffffff",
      border: "0",
      padding: "0 12px",
    },
    "& .top-bar": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    "& ::placeholder": {
      color: "black !important",
      opacity: "1",
    },
    "& :-ms-input-placeholder": {
      color: "black !important",
      opacity: "1",
    },
    "& ::-ms-input-placeholder": {
      color: "black !important",
      opacity: "1",
    },
    "& a": {
      textDecoration: "none !important",
      color: "black",
    },
    "& .pending": {
      background: "#FFEDE0",
      color: "#FC8434",
      fontWeight: 600,
      padding: "5px 10px",
      borderRadius: "25px",
    },
    "& .error": {
      color: "red",
    },
    "& .budget-box": {
      marginTop: "50px",
      marginBottom: "30px",
      "& .MuiCard-root": {
        boxShadow: "none",
        borderRadius: "8px",
      },
      "& .heading": {
        padding: "20px",
      },
      "& .budget-content-box": {
        padding: "20px",
        "& .head": {
          fontSize: "14px",
          "& span": {
            fontWeight: "400",
          },
        },
      },
      "& .footer": {
        padding: "20px",
        "& .content-line": {
          "& p": {
            fontSize: "22px",
          },
          "& span": {
            fontSize: "22px",
            fontWeight: "600",
            color: "#FC8434",
          },
        },
      },
      "& .content-line": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& span": {
          fontWeight: "600",
        },
      },
      "& .audit-line": {
        "& p": {
          width: "60%",
          display: "inline-block",
        },
        "& span": {
          width: "40%",
        },
      },
      "& .head.audit-line": {
        "& p": {
          fontWeight: "600",
        },
        "& span": {
          fontWeight: "600 !important",
        },
      },
      "& hr": {
        display: "block",
        height: "1px",
        border: 0,
        borderTop: "1px solid #e0e0e0",
        padding: 0,
      },
    },
    "& .building-box": {
      "& .MuiCard-root": {
        boxShadow: "none",
        borderRadius: "8px",
        padding: "20px",
        "& .left-box": {
          display: "flex",
          gap: "30px",
          flexDirection: "column",
          "& .building": {
            display: "flex",
            alignItems: "center",
            gap: "20px",
            "& img": {
              width: "70px",
              height: "70px",
              borderRadius: "50%",
            },
          },
        },
        "& .right-box img": {
          width: "100%",
          height: "120px",
          borderRadius: "8px",
        },
      },
    },
    "& .budget-box.audit-box": {
      marginTop: "20px",
      "& .heading": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
      "& .report-pdf-box": {
        border: "1px solid #E4E4E4",
        padding: "12px 20px",
        borderRadius: "8px",
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& .left-side": {
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: "600",
        },
      },
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
  },
};
