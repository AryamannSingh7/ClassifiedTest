export const DocumentReportStyleWeb: any = {
  documentChairman: {
    "& .navigation": {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    "& .navigation > .MuiBox-root": {
      width: "100%",
    },
    "& .navigation button": {
      background: "#2b6fed",
      color: "#FFF",
      width: "220px",
      borderRadius: "8px",
      padding: "10px",
      fontWeight: "bold",
    },
    "& .navigation .top-heading": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      width: "100%",
      marginTop: 10,
      marginBottom: 0,
    },
    "& .navigation .sub-heading": {
      fontWeight: 600,
      wordBreak: "break-all",
      marginRight: "15px",
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
      padding: 12,
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
      wordBreak: "break-all",
      // textTransform: "capitalize",
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
      padding: "10px 18px 18px",
    },
    "& .document-box .card-item .heading": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      textTransform: "capitalize",
      marginBottom: "10px",
    },
    "& .document-box .card-item .heading h4": {
      wordBreak: "break-all",
    },
    "& .document-box .card-item .res-info": {
      width: "100%",
      display: "flex",
    },
    "& .document-box .card-item .res-info span": {
      color: "black",
    },
    "& .document-box .card-item .res-info p": {
      color: "darkgray",
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
      fontSize: "14px",
      marginLeft: "5px",
      textTransform: "capitalize",
    },
    "& .document-box.resolutions .item": {
      minHeight: "20px",
      marginTop: "15px",
    },
    "& .szh-menu-container ul li a": {
      textDecoration: "none",
      color: "black",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
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
    "& .menu.personal-document-menu": {
      justifyContent: "space-between",
      textTransform: "capitalize",
    },
    "& .menu.personal-document-menu .name": {
      display: "flex",
      alignItems: "center",
      maxWidth: "95%",
    },
    "& .menu.personal-document-menu span": {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
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
      wordBreak: "break-all",
    },
    "& .document-box .item button.color-btn": {
      padding: "5px 11px",
      minWidth: "60px",
      borderRadius: "25px",
      fontWeight: "600",
      background: "#FEF9F3",
      color: "#FD9048",
    },
    "& a": {
      textDecoration: "none !important",
    },
    "& .szh-menu-container ul li a": {
      textDecoration: "none",
      color: "black",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    "& .document .left-side": {
      display: "flex",
      alignItems: "center",
    },
    "& .document .left-side h4": {
      display: "block",
      textTransform: "capitalize",
      wordBreak: "break-all",
    },
    "& .document .left-side img": {
      width: "45px",
      marginRight: "10px",
    },
    "& .document .left-side .info .more-info": {
      display: "flex",
      alignItems: "center",
    },
    "& .document .left-side .info .more-info span": {
      color: "orange",
      marginRight: "5px",
    },
    "& .document .left-side .info .more-info p": {
      marginRight: "10px",
    },
    "& .upload-button": {
      position: "sticky",
      left: 0,
      right: 0,
      bottom: 0,
      background: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px 0",
      boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
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
    "& .list": {
      position: "relative",
      width: "100%",
    },
    "& .list > .MuiGrid-root": {
      alignContent: "flex-start",
    },
    "& .list .personal-documents": {
      minHeight: "calc(100% - 70px)",
    },
    "& .list .personal-documents .empty-list": {
      background: "white",
      height: "calc(100% - 70px)",
    },
    "& .list .personal-documents .empty-list .content-box": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      flexDirection: "column",
      height: "100%",
      padding: "20px",
    },
    "& .list .personal-documents .empty-list .content-box img": {
      marginBottom: "20px",
    },
    "& .list .personal-documents .content-box h3": {
      fontWeight: "600",
      marginBottom: "15px",
    },
    "& .document-view": {
      background: "white",
      padding: "15px",
    },
    "& .document-view iframe": {
      width: "100%",
      height: "95%",
      border: "0",
    },
  },
  buildingDocument: {
    "& .menu": {
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
      cursor: "pointer",
      marginBottom: "18px",
      background: "#FFFFFF",
      padding: "10px 20px",
      textTransform: "capitalize",
    },
    "& .menu .name": {
      display: "flex",
      alignItems: "center",
      maxWidth: "95%",
    },
    "& .menu span": {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
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
      background: "white",
    },
    "& .document-box.resolution-box": {
      background: "#F8F9FE",
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
      wordBreak: "break-all",
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
    "& a": {
      textDecoration: "none !important",
    },
    "& .list .personal-documents .empty-list": {
      background: "white",
      height: "calc(100% - 40px)",
    },
    "& .list .personal-documents .empty-list .content-box": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      flexDirection: "column",
      height: "100%",
      padding: "20px",
    },
    "& .document .left-side": {
      display: "flex",
      alignItems: "center",
    },
    "& .document .left-side h4": {
      textTransform: "capitalize",
      wordBreak: "break-all",
    },
    "& .document .left-side img": {
      width: "35px",
      marginRight: "10px",
    },
    "& .document-box .card-item": {
      boxShadow: "none",
      padding: "10px 20px 20px",
    },
    "& .document-box .card-item .heading": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "10px",
      textTransform: "capitalize",
      wordBreak: "break-all",
    },
    "& .document-box .card-item .res-info": {
      width: "100%",
      display: "flex",
      marginBottom: "10px",
    },
    "& .document-box .card-item .res-info span": {
      color: "black",
    },
    "& .document-box .card-item .res-info p": {
      color: "darkgray",
    },
    "& .document-box .card-item .res-info .info-item": {
      width: "50%",
    },
    "& .document-box .meeting-item .item-title,& .document-box .meeting-item .icons": {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
    },
    "& .document-box .meeting-item .icons img": {
      margin: "0 5px",
      cursor: "pointer",
      width: "20px",
    },
    "& .document-box .card-item .item-title h6": {
      fontWeight: "600",
      fontSize: "14px",
      marginLeft: "5px",
      textTransform: "capitalize",
      lineHeight: "18px",
    },
    "& .document-box .meeting-item": {
      minHeight: "34px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      padding: 15,
      borderRadius: 10,
      border: "2px solid lightgray",
    },
    "& .menu.building-document-menu": {
      justifyContent: "space-between",
    },
    "& .document-view iframe": {
      width: "100%",
      height: "95%",
      border: "0",
    },
    "& .view .item-title h6": {
      fontWeight: "600",
      marginLeft: "10px",
      lineHeight: "18px",
    },
    "& .view": {
      marginTop: "15px",
      marginBottom: "15px",
    },
    "& .meeting-details": {},
    "& .meeting-details .card": {
      padding: "15px",
      marginBottom: "10px",
      marginTop: "10px",
    },
    "& .meeting-details p": {
      color: "darkgray",
      paddingTop: "5px",
    },
    "& .meeting-details p:first-child": {
      paddingTop: "0",
    },
    "& .meeting-details span": {
      color: "black",
    },
  },
};
