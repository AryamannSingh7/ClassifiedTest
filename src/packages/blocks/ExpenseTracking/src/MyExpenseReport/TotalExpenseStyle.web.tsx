export const TotalExpenseStyle: any = {
  totalExpense: {
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
    "& .MuiContainer-root": {
      overflowY: "auto",
      height: "87vh",
    },
    "& .tenant-list-box": {
      marginTop: "15px",
      position: "relative",
    },
    "& .tenant-list-box .tenant-list": {
      height: "calc(100% - 40px)",
    },
    "& .date-box": {
      background: "white",
      borderRadius: "25px",
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #f0f0f0",
    },
    "& .date-box.MuiInput-underline::before": {
      position: "unset",
      content: "",
    },
    "& .date-box.MuiInput-underline::after": {
      position: "unset",
    },
    "& .input-date-box": {
      background: "white",
      borderRadius: "25px",
      padding: "14px 12px 14px 40px",
      border: "1px solid #f0f0f0",
      position: "relative",
      "& img": {
        top: "16px",
        left: "16px",
        position: "absolute",
      },
      "& input": {
        width: "100%",
        border: "0",
        outline: "none",
        fontSize: "16px",
      },
    },
    "& .total-expense": {
      "& .heading": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& select": {
          background: "white",
          borderRadius: "25px",
          padding: "8px 12px",
          border: "1px solid #f0f0f0",
        },
      },
      "& .main-box": {
        boxShadow: "none",
        borderRadius: "8px",
        padding: "20px",
        "& .expense-card-box": {
          display: "flex",
          alignItems: "center",
          gap: "15px",
          "& .image-box": {
            borderRadius: "50%",
            padding: "20px",
            border: "1px solid #f0f0f0",
          },
          "& .content-box": {
            gap: "5px",
            display: "flex",
            flexDirection: "column",
            "& .amount": {
              color: "#FC8434",
            },
          },
        },
      },
      "& .expense-card": {
        boxShadow: "none",
        borderRadius: "8px",
        padding: "20px",
        "& .expense-card-box": {
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          "& .amount": {
            color: "#FC8434",
          },
          "& p": {
            marginBottom: "5px",
          },
        },
      },
      "& .unit-expense-card-box": {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        "& p": {
          fontWeight: "600",
        },
      },
    },
    "& .big-box": {
      paddingBottom: "0",
      borderRadius: "8px",
      boxShadow: "none",
      paddingTop: "20px",
    },
    "& .big-box .image": {
      padding: "20px",
      border: "3px solid #F8F9FE",
      display: "inline-block",
      borderRadius: "50%",
      marginBottom: "20px",
    },
    "& .big-box h4": {
      marginBottom: "20px",
      textTransform: "capitalize",
    },
    "& .big-box .state p": {
      marginBottom: "5px",
      textTransform: "capitalize",
    },
    "& .big-box button": {
      padding: "5px 11px",
      minWidth: "125px",
      borderRadius: "25px",
      fontWeight: "600",
      color: "#8A8A8A",
      background: "#F6F6F6",
    },
    "& .big-box button.yellow": {
      background: "#FEF9F3",
      color: "#FD9048",
    },
    "& .big-box .content-box": {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-evenly",
    },
    "& .big-box .content-box .left-content": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      marginBottom: "20px",
      width: "40%",
      textAlign: "center",
    },
    "& .big-box .content-box .left-content .state": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    "& .big-box .content-box .right-content .state": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    "& .big-box .content-box .right-content": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      marginBottom: "20px",
      width: "40%",
      textAlign: "center",
    },
    "& .big-box .content-box .center-content": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      width: "20%",
    },
    "& .big-box .content-box .center-content .vertical-line": {
      width: "3px",
      height: "30px",
      background: "#F8F9FE",
    },
    "& .big-box .content-box .center-content .image": {
      marginBottom: "0px",
    },
    "& .big-box .content-box .center-content .image.text": {
      padding: "15px",
    },
    "& .big-box .content-box .center-content .image.text h4": {
      marginBottom: "0px",
      color: "#FD9048",
    },
    "& .rented-empty-card": {
      boxShadow: "none",
      borderRadius: "8px",
      padding: "20px",
      "& h4": {
        marginBottom: "10px",
      },
      "& .orange": {
        color: "#FC8434",
        fontWeight: "600",
      },
    },
  },
};
