export const DocumentReportStyleWeb: any = {
  documentChairman: {
    "& .navigation": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& .navigation > .MuiBox-root": {
      width: "100%",
    },
    "& .navigation button": {
      background: "#2B6FEC",
      color: "#FFF",
    },
    "& .navigation .top-heading": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      width: "100%",
    },
    "& .navigation .sub-heading": {
      fontWeight: 600,
      marginTop: 15,
      marginBottom: 15,
    },
    "& .document-box": {
      marginBottom: 20,
      borderRadius: 5,
      background: "#FFF",
      padding: 20,
    },
    "& .document-box .item": {
      minHeight: "34px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      padding: 15,
      borderRadius: 10,
      border: "2px solid lightgray",
    },
    "& .document-box .item .heading": {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
    },
    "& .document-box .item .heading h4": {
      fontWeight: "600",
      fontSize: "16px",
      marginLeft: "10px",
      textTransform: "capitalize",
    },
    "& .document-box .item button.color-btn": {
      padding: "5px 11px",
      minWidth: "60px",
      borderRadius: "25px",
      fontWeight: "600",
      background: "#FEF9F3",
      color: "#FD9048",
    },
    "& .document-box a, & .navigation a": {
      textDecoration: "none !important",
    },
    "& .document-box iframe": {
      width: "100%",
      height: "80vh",
      border: "0",
    },
    "& .document-box.resolutions": {
      background: "#F4F7FF",
      padding: 0,
      marginBottom: 20,
      marginTop: 10,
      borderRadius: 5,
    },
    "& .document-box .card-item": {
      boxShadow: "none",
      padding: "10px 20px 20px",
    },
    "& .document-box .card-item .heading": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    "& .document-box .card-item .res-info": {
      width: "100%",
      display: "flex",
    },
    "& .document-box .card-item .res-info .info-item": {
      width: "50%",
    },
    "& .document-box .card-item .item .item-title,& .document-box .card-item .item .icons": {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
    },
    "& .document-box .card-item .item .icons img": {
      margin: "0 5px",
      cursor: "pointer",
      width: "20px",
    },
    "& .document-box .card-item .item-title h6": {
      fontWeight: "600",
      fontSize: "16px",
      marginLeft: "5px",
    },
    "& .document-box.resolutions .item": {
      minHeight: "20px",
      marginTop: "15px",
    },
    "& .szh-menu-container ul li a": {
      textDecoration: "none",
      color: "black",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      // fontWeight: "bold",
    },
  },
  personalDocument: {
    "& .menu": {
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
      cursor: "pointer",
      marginBottom: "18px",
      background: "#FFFFFF",
      padding: "10px 20px",
    },
    "& .right-image": {
      padding: "25px 60px",
    },
    "& .content-area": {
      overflowY: "auto",
      overflowX: "hidden",
      height: "85vh",
    },
    "& .document-box .item": {
      minHeight: "34px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      padding: 15,
      borderRadius: 10,
      // border: "2px solid lightgray",
      background: "white",
    },
    "& .document-box .item .heading": {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
    },
    "& .document-box .item .heading h4": {
      fontWeight: "600",
      fontSize: "16px",
      marginLeft: "10px",
      textTransform: "capitalize",
    },
    "& .document-box .item button.color-btn": {
      padding: "5px 11px",
      minWidth: "60px",
      borderRadius: "25px",
      fontWeight: "600",
      background: "#FEF9F3",
      color: "#FD9048",
    },
    "& .document-box a": {
      textDecoration: "none !important",
    },
  },
};
