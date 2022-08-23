export const ContractsStyleWeb: any = {
  contractList: {
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
    "& .top-bar .right-icon img": {
      marginLeft: "15px",
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
      height: "78vh",
    },
    "& .content-box": {
      position: "relative",
      width: "100%",
    },
    "& .content-box > .MuiGrid-root": {
      alignContent: "flex-start",
    },
    "& .content-box .contracts-list, .content-box .templates-list": {
      minHeight: "calc(100% - 70px)",
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
    "& .contracts-list .contract, & .templates-list .template": {
      padding: "10px 25px",
      borderRadius: "10px",
      background: "white",
      boxShadow: "4px 0px 14px #ececec",
    },
    "& .contracts-list .contract .header": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    "& .contracts-list .contract .header h4": {
      wordBreak: "break-all",
    },
    "& .contracts-list .contract .info span": {
      color: "gray",
    },
    "& .contracts-list .contract .info p": {
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
  },
  detailPage: {
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
    "& .top-bar .right-icon img": {
      marginLeft: "15px",
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
      height: "78vh",
    },
    "& .content-box > .MuiGrid-root": {
      alignContent: "flex-start",
    },
    "& .content-box .contracts-list": {
      minHeight: "calc(100% - 70px)",
      overflowY: "auto",
      overflowX: "hidden",
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
    "& .upload-button .upload-button-group": {
      width: "380px",
    },
    "& .upload-button .top": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    "& .upload-button .bottom": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "10px",
    },
    "& .upload-button .bottom .image": {
      border: "2px solid #2b6fec",
      borderRadius: "50%",
      cursor: "pointer",
    },
    "& .upload-button .bottom .image img": {
      padding: "10px",
    },
    "& .upload-button .top button": {
      fontWeight: "600",
      border: "2px solid #2b6fec",
      color: "#2b6fec",
      padding: "12px 50px",
      borderRadius: "25px",
    },
    "& .upload-button .bottom button": {
      background: "#2b6fec",
      color: "white",
      padding: "12px 50px",
      borderRadius: "25px",
    },
    "& .upload-button .MuiGrid-container": {
      width: "fit-content",
    },
  },
  selectTemplate: {
    "& .top-bar": {
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
      cursor: "pointer",
      // marginBottom: "18px",
      background: "#FFFFFF",
      padding: "10px 20px",
      justifyContent: "space-between",
      borderBottom: "2px solid #F9F9F9",
    },
    "& .top-bar .left-icon": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    "& .top-bar .right-icon img": {
      marginLeft: "15px",
    },
    "& .right-image": {
      padding: "23px 60px",
    },
    "& a": {
      textDecoration: "none !important",
    },
    "& .page-container": {
      overflowY: "auto",
      height: "85vh",
    },
    "& .issue-lease-content .select-input-box .select-input": {
      background: "#F9F9F9",
      border: "1px solid #F0F0F0",
      borderRadius: "25px",
      marginTop: "18px",
    },
    "& .issue-lease-content .tenant-info": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "18px 0",
    },
    "& .issue-lease-content .tenant-info a": {
      color: "#FC8434",
      fontWeight: "600",
    },
    "& .issue-lease-content .tenant-info span": {
      color: "#9C9C9C",
    },
    "& .issue-lease-content .tenant-info p": {
      color: "black",
      fontWeight: "600",
    },
    "& .templates-list": {
      width: "100% !important",
    },
    "& .templates-list h3": {
      margin: "10px 0",
      fontWeight: "600",
    },
    "& .templates-list .template": {
      borderRadius: "10px",
      background: "white",
      boxShadow: "4px 0px 14px #ececec",
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
      top: "10px",
      right: "10px",
    },
    "& .templates-list .template .right-menu span": {
      background: "#fef0e7",
      color: "#FC8434",
      borderRadius: "25px",
      padding: "5px 10px",
      fontSize: "12px",
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
    "& .contract-info ": {
      margin: "15px 0",
    },
    "& .contract-info .contract": {
      padding: "10px 25px",
      borderRadius: "10px",
      background: "white",
      boxShadow: "4px 0px 14px #ececec",
    },
    "& .contract-info .contract .header": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    "& .contract-info .contract .header h4": {
      wordBreak: "break-all",
    },
    "& .contract-info .contract .info span": {
      color: "gray",
    },
    "& .contract-info .contract .info p": {
      color: "black",
    },
    "& .contract-info > p": {
      color: "gray",
      margin: "15px 0",
    },
    "& .contract-info > p span": {
      color: "black",
    },
  },
};
