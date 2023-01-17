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
            textTransform: "capitalize",
          },
          "& span.building": {
            color: "blue",
            background: "#e9e9ff",
          },
          "& span.type": {
            color: "green",
            background: "#daffda",
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
  chairmanNotification: {
    "& .navigation": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& h4": {
      fontSize: "22px",
    },
    "& .navigation .sub-heading": {
      fontWeight: 600,
      marginTop: 15,
      marginBottom: 15,
    },
    "& a": {
      textDecoration: "none !important",
    },
    "& .content-boxes": {
      marginBottom: "50px",
      marginTop: "20px",
    },
    "& .content-boxes .MuiTab-root": {
      borderTopLeftRadius: "8px",
      // borderTopRightRadius: "8px",
      background: "white",
      color: "#2b6fed",
      fontWeight: 600,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      border: "0",
      textTransform: "capitalize",
    },
    "& .content-boxes .MuiTab-root.Mui-selected": {
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
      background: "#2b6fed",
      color: "white",
      fontWeight: 600,
      border: "0",
    },
    "& .content-boxes .MuiTabs-indicator": {
      display: "none",
    },
    "& .content-boxes .tab-content": {
      borderRadius: "8px",
      background: "white",
    },
    "& .tab-content-box": {
      borderRadius: "8px",
      background: "white",
      padding: "15px",
      "& .notification-box:hover": {
        background: "rgba(43,111,237,0.03)",
      },
      "& .notification-box:hover button.view-button": {
        background: "rgba(43,111,237,0.03)",
      },
      "& .notification-box": {
        borderRadius: "8px",
        border: "1px solid #e4e4e4",
        padding: "15px",
        "& .header": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        },
        "& .tag-box": {
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          "& span": {
            fontSize: "14px",
            padding: "5px 12px",
            borderRadius: "25px",
            fontWeight: 600,
          },
        },
        "& h4": {
          margin: "10px 0",
        },
        "& .time": {
          margin: "10px 0",
          fontSize: "14px",
          fontWeight: 600,
          color: "#8e8e8e",
        },
        "& button.view-button": {
          border: "1px solid #2B6FED",
          background: "white",
          fontWeight: 600,
          color: "#2B6FED",
          padding: "10px 20px",
          borderRadius: "8px",
        },
      },
    },
    "& .building": {
      color: "#2B6FED",
      background: "#e7efff",
    },
    "& .unit": {
      background: "#ffeee2",
      color: "#FC8434",
    },
    "& .category": {
      background: "#d2ffe2",
      color: "#1EC65B",
    },
  },
};
