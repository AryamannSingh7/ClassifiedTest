export const MyUnitStyle: any = {
  myUnitList: {
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
    "& .top-bar .right-icon img": {
      cursor: "pointer",
    },
    "& .right-image": {
      padding: "25px 60px",
    },
    "& a": {
      textDecoration: "none !important",
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
    "& .tenant-list-box .tenant .city": {
      color: "lightslategrey",
    },
    "& .tenant-list-box .tenant .header": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    "& .tenant-list-box .tenant .info": {
      marginTop: "10px",
    },
    "& .tenant-list-box .tenant .info span.header": {
      color: "black",
      fontSize: "16px",
    },
    "& .tenant-list-box .tenant .info button": {
      display: "block",
      borderRadius: "25px",
      fontWeight: 600,
      padding: "8px 20px",
      background: "#ffeadc",
      color: "#FC8434",
      marginTop: "5px",
    },
    "& .tenant-list-box .tenant .info button span": {
      color: "#FC8434",
      textTransform: "capitalize",
    },
    "& .tenant-list-box .tenant .info button.Rented": {
      background: "#dbffe8",
      "&  span": {
        color: "#1EC65B",
      },
    },
    "& .tenant-list-box .tenant .info button.Empty": {
      background: "#d6d6d6",
      "&  span": {
        color: "#606060",
      },
    },
    "& .tenant-list-box .tenant .info button.Pending": {
      background: "#ffd7d7",
      "&  span": {
        color: "#ED5656",
      },
    },
  },
};
