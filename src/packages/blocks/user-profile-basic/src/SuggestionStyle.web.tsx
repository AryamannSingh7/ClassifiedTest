export const SuggestionStyleWeb: any = {
  suggestion: {
    "& .navigation": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& .navigation > .MuiBox-root": {
      width: "100%",
    },
    "& .navigation .sub-heading": {
      fontWeight: 600,
      marginTop: 15,
      marginBottom: 15,
    },
    "& .navigation .heading-top-bar": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    "& .navigation .heading-top-bar .filter": {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    "& .navigation .heading-top-bar .filter select": {
      padding: "10px 20px 10px 10px",
      fontSize: "16px",
      borderRadius: "8px",
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
      paddingBottom: "20px",
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
    "& .green-span": {
      background: "#D4FFE3",
      color: "#1EC65B",
      fontWeight: 600,
    },
    "& .red-span": {
      background: "#FFEAEA",
      color: "#F21717",
      fontWeight: 600,
    },
  },
  suggestionDetails: {
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
    "& .navigation .sub-heading button": {
      background: "#FC8434",
      color: "white",
      padding: "10px 20px",
      borderRadius: "5px",
      fontWeight: "600",
    },
    "& .navigation .sub-heading h3": {
      fontWeight: 600,
    },
    "& .navigation h5.sub-heading ": {
      fontWeight: 600,
    },
    "& a": {
      textDecoration: "none",
      color: "black",
    },
    "& .green-span": {
      background: "#D4FFE3",
      color: "#1EC65B",
      fontWeight: 600,
    },
    "& .red-span": {
      background: "#FFEAEA",
      color: "#F21717",
      fontWeight: 600,
    },
    "& .blue-span": {
      background: "#c3d8ff",
      color: "#2B6FED",
      fontWeight: 600,
    },
    "& .content-box .MuiCard-root": {
      padding: "20px",
      boxShadow: "none",
    },
    "& .content-box .suggestion-detail .MuiCard-root > img": {
      width: "100%",
      height: "250px",
      borderRadius: "8px",
      marginBottom: "20px",
    },
    "& .content-box .suggestion-detail .heading": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    "& .content-box .suggestion-detail .heading > span": {
      padding: "5px 10px",
      borderRadius: "25px",
    },
    "& .content-box .suggestion-detail .heading span": {
      fontWeight: 600,
    },
    "& .content-box .suggestion-detail .suggestion-info": {
      marginTop: "20px",
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    "& .content-box .suggestion-detail .suggestion-info .info": {
      display: "flex",
      gap: "10px",
      alignItems: "flex-start",
    },
    "& .content-box .suggestion-detail .suggestion-info .info img": {
      marginTop: "2px",
    },
    "& .content-box .suggestion-detail .suggestion-info .info p": {
      fontWeight: 600,
    },
    "& .content-box .suggestion-detail .suggestion-info .info .heading": {
      color: "grey",
      marginBottom: "0",
      fontWeight: 500,
    },
    "& .content-box .response-input": {
      margin: "20px 0",
    },
    "& .content-box .response-input textarea": {
      minHeight: "150px",
      padding: "10px",
      border: "0",
      outline: "none",
      width: "100%",
      background: "#EAEAEA",
      borderRadius: "5px",
    },
    "& .content-box .response-input button": {
      padding: "8px 20px",
      marginTop: "15px",
      borderRadius: "5px",
      background: "#2B6FED",
      fontWeight: "600",
      color: "white",
    },
    "& .content-box .responses-box .response": {
      margin: "10px 0",
    },
    "& .content-box .responses-box .response span": {
      fontWeight: 600,
    },
  },
  announcements: {
    "& .navigation": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& .navigation > .MuiBox-root": {
      width: "100%",
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
    "& .meeting-table .filter": {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    "& .meeting-table .filter .select-input .MuiSelect-root": {
      background: "#FFFFFF",
      border: "1px solid lightgray",
      borderRadius: "8px",
      padding: "10px 30px 10px 10px",
    },
    "& .meeting-table .filter .select-input:before": {
      border: 0,
    },
    "& .meeting-table .filter .select-input:after": {
      border: 0,
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
      paddingBottom: "20px",
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
    "& .green-span": {
      background: "#D4FFE3",
      color: "#1EC65B",
      fontWeight: 600,
    },
    "& .red-span": {
      background: "#FFEAEA",
      color: "#F21717",
      fontWeight: 600,
    },
  },
};
