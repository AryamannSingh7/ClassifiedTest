export const EmailAlertsStyle: any = {
  totalExpense: {
    height: "100vh",
    overflowY: "hidden",
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
      fontSize: "18px",
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
    "& .MuiContainer-root": {
      overflowY: "auto",
      height: "87vh",
    },
    "& .setting-page": {
      marginTop: "15px",
    },
    "& .main-setting-box": {
      boxShadow: "none",
      borderRadius: "8px",
      padding: "22px",
      "& .setting-content-box": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& h4": {
          fontSize: "17px",
        },
      },
      "& .card-box-setting": {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        "& .setting-text": {
          color: "#FC8434",
          fontWeight: "600",
          cursor: "pointer",
        },
      },
    },
    "& .MuiSwitch-root": {
      height: "unset",
      padding: "unset",
      "& .MuiSwitch-switchBase": {
        top: "3px",
        left: "3px",
        padding: "0",
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        color: "white",
      },
      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: "#FC8434",
      },
      "& .MuiSwitch-thumb": {
        width: "16px",
        height: "16px",
        padding: "0",
      },
      "& .MuiSwitch-track": {
        height: "22px",
        width: "42px",
        borderRadius: "50px",
      },
    },
  },
};
