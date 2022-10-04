export const TenantStyle: any = {
  tenantList: {
    "& .top-bar": {
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
      cursor: "pointer",
      background: "#FFFFFF",
      padding: "10px 20px",
      justifyContent: "space-between",
      zIndex: "9999",
      borderBottom: "2px solid #e2e2ef",
    },
    "& .top-bar .left-icon": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    },
    "& .top-bar .left-icon span": {
      lineHeight: "18px",
    },
    "& .top-bar .right-icon": {
      display: "flex",
      alignItems: "center",
    },
    "& .right-image": {
      padding: "25px 60px",
    },
    "& a": {
      textDecoration: "none !important",
    },
    "& .empty-list": {
      background: "white",
      height: "88vh",
      position: "relative",
      overflow: "hidden",
    },
    "& .empty-list .content-box": {
      height: "calc(100% - 70px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "12px",
    },
    "& .empty-list .content-box h3": {
      fontWeight: 600,
    },
    "& .empty-list .content-box .MuiBox-root": {
      textAlign: "center",
    },
    "& .empty-list .upload-button": {
      position: "sticky",
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px 0",
    },
    "& .empty-list .upload-button .MuiGrid-root": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    "& .empty-list .upload-button button": {
      background: "#2b6fec",
      color: "white",
      padding: "12px 50px",
      borderRadius: "25px",
      fontWeight: 600,
    },
    "& .tenant-list-box": {
      marginTop: "15px",
      height: "88vh",
      position: "relative",
      overflow: "hidden",
    },
    "& .tenant-list-box .upload-button": {
      position: "sticky",
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px 0",
    },
    "& .tenant-list-box .upload-button .MuiGrid-root": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    "& .tenant-list-box .upload-button button": {
      background: "#2b6fec",
      color: "white",
      padding: "12px 50px",
      borderRadius: "25px",
      fontWeight: 600,
    },
    "& .tenant-list-box .tenant-list": {
      height: "calc(100% - 70px)",
      overflowX: "hidden",
    },
    "& .tenant-list-box .tenant": {
      borderRadius: "8px",
      boxShadow: "none",
      padding: "12px",
    },
    "& .tenant-list-box .tenant .header": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    "& .tenant-list-box .tenant .info span": {
      color: "gray",
      fontSize: "14px",
    },
    "& .tenant-list-box .tenant .info p": {
      color: "black",
    },
  },
  tenantDetails: {
    "& .top-bar": {
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
      cursor: "pointer",
      background: "#FFFFFF",
      padding: "10px 20px",
      justifyContent: "space-between",
      zIndex: "9999",
      borderBottom: "2px solid #e2e2ef",
    },
    "& .top-bar .left-icon": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    },
    "& .top-bar .left-icon span": {
      lineHeight: "18px",
    },
    "& .top-bar .right-icon": {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    "& .right-image": {
      padding: "25px 60px",
    },
    "& a": {
      textDecoration: "none !important",
    },
    "& .tenant-detail-box": {
      background: "white",
      height: "88vh",
      overflow: "auto",
    },
    "& .tenant-detail-box .detail": {
      margin: "15px 0",
    },
    "& .tenant-detail-box .detail .detail-box": {
      borderRadius: "8px",
      marginTop: "10px",
      boxShadow: "none",
      padding: "15px 20px",
      border: "1px solid #e2e2ef",
    },
    "& .tenant-detail-box .detail .detail-box .info-item": {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
    },
    "& .tenant-detail-box .detail .detail-box .info-item .item-data": {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    "& .tenant-detail-box .detail .detail-box .info-item span": {
      lineHeight: "14px",
    },
    "& .tenant-detail-box .detail .detail-box .info-item p": {
      fontWeight: 600,
    },
    "& .tenant-detail-box .pdf-list-box": {},
    "& .tenant-detail-box .pdf-list-box .pdf-card": {
      borderRadius: "8px",
      marginTop: "10px",
      boxShadow: "none",
      border: "1px solid #e2e2ef",
      padding: "15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    "& .tenant-detail-box .pdf-list-box .pdf-card .heading": {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      fontWeight: 600,
    },
  },
  selectTemplate: {
    "& .top-bar": {
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
      cursor: "pointer",
      background: "#FFFFFF",
      padding: "10px 20px",
      justifyContent: "space-between",
      borderBottom: "2px solid #F9F9F9",
      position: "sticky",
      top: "0",
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
      borderRadius: "30px",
      marginTop: "18px",
    },
    "& .issue-lease-content .select-input-box .select-input .MuiSelect-root": {
      background: "#F9F9F9",
      borderRadius: "30px",
      padding: "20px 30px",
    },
    "& .issue-lease-content .MuiListItemIcon-root": {
      minWidth: "30px",
    },
    "& .issue-lease-content .select-input-box .input.select-input": {
      padding: "14px 22px",
    },
    "& .issue-lease-content .select-input-box .input.select-input .MuiInputAdornment-positionStart": {
      marginRight: "14px",
    },
    "& .issue-lease-content .select-input-box .input.select-input:before": {
      border: 0,
    },
    "& .issue-lease-content .select-input-box .input.select-input:after": {
      border: 0,
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
    "& .issue-lease-content .upload-box": {
      border: "3px dashed #F0F0F0",
      background: "#F9F9F9",
      borderRadius: "10px",
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "150px",
      marginTop: "18px",
    },
    "& .issue-lease-content .upload-box p": {
      color: "#CBCBCB",
      marginTop: "10px",
    },
    "& .templates-list": {
      width: "100% !important",
    },
    "& .templates-list h3": {
      margin: "15px 0",
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
    "& .next-button": {
      background: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px 0",
      boxShadow: "none",
      marginTop: "20px",
    },
    "& .next-button button": {
      minWidth: "300px",
      background: "#2b6fec",
      color: "white",
      padding: "12px 50px",
      borderRadius: "25px",
    },
    "& .error": {
      color: "red",
      marginTop: "10px",
      marginLeft: "20px",
      fontSize: "14px",
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
  },
};
