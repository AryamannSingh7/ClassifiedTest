export const DashboardStyleWeb: any = {
  ownerDashboard: {
    "& .menu": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontWeight: "600",
      cursor: "pointer",
      marginBottom: "18px",
      background: "#FFFFFF",
      padding: "10px 20px",
    },
    "& .menu .left-icon": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    "& .menu .left-icon span.complex-name": {
      color: "blue",
      marginLeft: "10px",
    },
    "& .menu .right-icon a": {
      marginLeft: "15px",
    },
    "& .dashboard": {
      overflowY: "auto",
      overflowX: "hidden",
      height: "85vh",
    },
    "& .dashboard .title": {
      paddingBottom: "5px",
    },
    "& .dashboard .title h5": {
      fontWeight: "600",
    },
    "& .right-image": {
      padding: "25px 60px",
    },
    "& .MuiCard-root": {
      padding: "20px 0",
      boxShadow: "none",
      textAlign: "center",
    },
    "& a": {
      textDecoration: "none !important",
    },
    "& .MuiCard-root .image": {
      padding: "20px",
      border: "3px solid #F8F9FE",
      display: "inline-block",
      borderRadius: "50%",
      marginBottom: "20px",
    },
    "& .MuiCard-root h4": {
      marginBottom: "20px",
      textTransform: "capitalize",
    },
    "& .MuiCard-root .state p": {
      marginBottom: "5px",
      textTransform: "capitalize",
    },
    "& .MuiCard-root button": {
      padding: "5px 11px",
      minWidth: "125px",
      borderRadius: "25px",
      fontWeight: "600",
      color: "#8A8A8A",
      background: "#F6F6F6",
    },
    "& .MuiCard-root button.yellow": {
      background: "#FEF9F3",
      color: "#FD9048",
    },
    "& .MuiCard-root.big-box": {
      paddingBottom: "0",
    },
    "& .MuiCard-root .content-box": {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-evenly",
    },
    "& .MuiCard-root .content-box .left-content": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      marginBottom: "20px",
      width: "40%",
      textAlign: "center",
    },
    "& .MuiCard-root .content-box .left-content .state": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    "& .MuiCard-root .content-box .right-content .state": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    "& .MuiCard-root .content-box .right-content": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      marginBottom: "20px",
      width: "40%",
      textAlign: "center",
    },
    "& .MuiCard-root .content-box .center-content": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      width: "20%",
    },
    "& .MuiCard-root .content-box .center-content .vertical-line": {
      width: "3px",
      height: "30px",
      background: "#F8F9FE",
    },
    "& .MuiCard-root .content-box .center-content .image": {
      marginBottom: "0px",
    },
    "& .MuiCard-root .content-box .center-content .image.text": {
      padding: "15px",
    },
    "& .MuiCard-root .content-box .center-content .image.text h4": {
      marginBottom: "0px",
      color: "#FD9048",
    },
    "& .notification-slider": {
      width: "100%",
      marginBottom: "20px",
    },
    "& .notification-slider .slick-list .slick-track": {
      display: "flex",
      gap: "20px",
    },
    "& .notification-slider .slick-prev": {
      display: "none !important",
    },
    "& .notification-slider .slick-next": {
      display: "none !important",
    },
    "& .notification-slider .slide-box": {
      width: "95% !important",
      padding: "20px",
      background: "white",
      borderRadius: "8px",
      cursor: "pointer",
    },
    "& .notification-slider .slide-box .heading": {
      display: "flex",
      gap: "15px",
      alignItems: "center",
    },
    "& .notification-slider .slide-box .heading span": {
      fontWeight: "600",
    },
    "& .notification-slider .slide-box p": {
      marginTop: "10px",
    },
  },
  generalDashboard: {
    background: "rgb(244, 247, 255)",
    "& .navigation": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      "& .sub-heading-box": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginTop: "10px",
        marginBottom: "10px",
        "& h5": {
          fontWeight: "600",
          fontSize: "22px",
        },
      },
      "& .select-year": {
        background: "#fff",
        border: "1px solid lightgrey",
        borderRadius: 5,
        padding: "2px 12px",
        "& select": {
          background: "#fff !important",
        },
      },
      "& .select-box": {
        display: "flex",
        alignItems: "center",
        gap: "14px",
      },
      "& .select-year:before": {
        content: "",
        border: 0,
        outline: "none",
        position: "unset",
      },
      "& .select-year:after": {
        content: "",
        border: 0,
        outline: "none",
        position: "unset",
      },
    },
    "& .dashboard-card-box": {
      padding: "40px 20px 20px 20px",
      background: "#fff",
      borderRadius: 8,
      boxShadow: "none",
      "& .card-image": {
        width: "40px",
        height: "40px",
        padding: "10px",
        border: "1px solid #d9d4d3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        "& img": {
          width: "28px",
          height: "28px",
        },
      },
      "& h4": {
        fontWeight: "600",
        fontSize: "17px",
        margin: "12px 0",
      },
      "& .card-bottom-info": {
        display: "flex",
        alignItems: "center",
        gap: "10px",
      },
      "& .info-box": {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        "& span": {
          fontWeight: "600",
          color: "#FC8434",
        },
      },
    },
    "& a": {
      textDecoration: "none !important",
    },
    "& .budget-table-content-box": {
      background: "#fff",
      borderRadius: 8,
      boxShadow: "none",
      "& .header": {
        fontWeight: "600",
        padding: "20px 15px",
        fontSize: "24px",
      },
      "& .footer": {
        padding: "20px 15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& p": {
          fontSize: "18px",
          fontWeight: "600",
        },
        "& h4": {
          fontSize: "18px",
          color: "#FC8434",
          fontWeight: "600",
        },
      },
      "& .body": {
        padding: "20px 15px",
        "& .table-header": {
          padding: "10px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          "& span": {
            color: "#999",
          },
        },
        "& .table-content": {
          padding: "10px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid #F4F6FB",
          "& span": {
            fontWeight: "600",
          },
        },
      },
      "& hr": {
        margin: "0",
        color: "#F4F6FB",
      },
    },
    "& .event-card": {
      padding: "20px 20px 20px 20px",
      background: "#fff",
      borderRadius: 8,
      boxShadow: "none",
      "& .event-heading": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
        marginBottom: "13px",
        "& h4": {
          marginBottom: "5px",
        },
        "& span": {
          background: "#D4FFE3",
          color: "#1EC65B",
          fontWeight: 600,
          padding: "5px 10px",
          borderRadius: "25px",
          fontSize: "14px",
        },
      },
      "& .event-content-box": {
        "& .event-content": {
          display: "flex",
          alignItems: "center",
          gap: "10px",
          margin: "5px 0",
        },
        "& .meeting-state-box": {
          display: "flex",
          alignItems: "center",
          gap: "20px",
          "& .meeting-state": {
            display: "flex",
            alignItems: "center",
            gap: "10px",
          },
        },
      },
    },
  },
};
