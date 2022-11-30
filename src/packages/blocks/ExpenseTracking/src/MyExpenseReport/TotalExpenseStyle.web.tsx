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
  },
};
