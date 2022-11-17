export const NotificationStyle: any = {
  ownerNotification: {
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
      "& .select-text": {
        color: "#FC8434",
        fontWeight: 600,
      },
    },
    "& .right-image": {
      padding: "25px 60px",
    },
    "& a": {
      textDecoration: "none !important",
    },
    "& .tenant-detail-box": {
      height: "88vh",
      overflow: "auto",
    },
    "& .rent-history-box": {
      "& .MuiCard-root": {
        boxShadow: "none",
        borderRadius: "8px",
        margin: "15px 0",
      },
      "& .rent-history": {
        padding: "12px 20px",
        margin: "10px 0",
        borderRadius: "8px",
        "& .left-side": {
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          "& span": {
            color: "#FC8434",
            cursor: "pointer",
            fontWeight: 600,
            background: " #ffecdf",
            padding: "5px 15px",
            borderRadius: "25px",
          },
        },
        "& .header": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          "& span": {
            fontWeight: 600,
            color: "#FC8434",
            cursor: "pointer",
          },
        },
        "& h4": {
          margin: "10px 0",
        },
        "& .time": {
          marginTop: "10px",
          fontWeight: 600,
          color: "#8e8e8e",
        },
      },
    },
  },
};
