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
};
