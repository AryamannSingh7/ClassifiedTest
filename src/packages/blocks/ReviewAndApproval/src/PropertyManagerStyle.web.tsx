export const PropertyManagerStyleWeb: any = {
  managerList: {
    "& .top-bar": {
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
      cursor: "pointer",
      marginBottom: "18px",
      background: "#FFFFFF",
      padding: "10px 20px",
      justifyContent: "space-between",
      position: "sticky",
      top: "0",
      zIndex: "999999",
    },
    "& .top-bar .left-icon": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    "& .top-bar .right-icon": {
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    "& .top-bar .right-icon .szh-menu-container ul": {
      top: "34px !important",
    },
    "& .right-image": {
      padding: "25px 60px",
    },
    "& a": {
      color: "black",
      textDecoration: "none !important",
    },
    "& .list-box": {
      height: "85vh",
    },
    "& .faq-step .MuiContainer-root": {
      overflowY: "auto",
      overflowX: "hidden",
    },
    "& .content-box": {
      position: "relative",
      width: "100%",
    },
    "& .content-box > .MuiGrid-root": {
      alignContent: "flex-start",
    },
    "& .content-box .contracts-list": {
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
      fontWeight: 600,
    },
    "& .upload-button .MuiGrid-container": {
      width: "fit-content",
    },
    "& .contracts-list .contract": {
      padding: "10px 25px",
      borderRadius: "10px",
      background: "white",
      boxShadow: "4px 0px 14px #ececec",
      "& .new-req-box": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& .right-side-req-box": {
          display: "flex",
          alignItems: "center",
          gap: "15px",
          "& button": {
            borderRadius: "25px",
            fontWeight: "600",
            background: "#FEF9F3",
            color: "#FD9048",
          },
        },
      },
      "& .request-buttons": {
        marginTop: "15px",
        "& button": {
          background: "#2b6fec",
          color: "white",
          padding: "8px 50px",
          borderRadius: "25px",
          fontWeight: 600,
          width: "100%",
        },
        "& button.decline": {
          background: "white",
          color: "#2b6fec",
          border: "1px solid #2b6fec",
          padding: "8px 50px",
          borderRadius: "25px",
          fontWeight: 600,
          width: "100%",
        },
      },
      "& .info": {
        "& span": {
          color: "gray",
        },
        "& p": {
          color: "black",
        },
      },
      "& .header": {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& h4": {
          wordBreak: "break-all",
        },
      },
    },
    "& .templates-list .template .szh-menu-container ul a": {
      color: "black",
    },
    "& .contracts-list .state": {
      color: "#FC8434 !important",
      fontWeight: 600,
    },
  },
  registerManager: {
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
      height: "88vh",
    },
    "& .issue-lease-content .select-input-box .select-input": {
      background: "#F9F9F9",
      border: "1px solid #F0F0F0",
      borderRadius: "30px",
      marginTop: "18px",
    },
    "& .issue-lease-content .MuiSelect-root": {
      background: "#F9F9F9",
      borderRadius: "30px",
    },
    "& .issue-lease-content .select-box": {
      position: "relative",
    },
    "& .issue-lease-content .select-box img": {
      position: "absolute",
      top: "38px",
      left: "15px",
    },
    "& .issue-lease-content .select-box .select-input": {
      width: "100%",
      paddingLeft: "50px",
    },
    "& .issue-lease-content .select-box .select-input.input": {
      fontSize: "16px",
      padding: "18px 10px 18px 60px !important",
      outline: "none",
    },
    "& .issue-lease-content .select-input-box .select-input .MuiListItemIcon-root": {
      minWidth: "40px",
    },
    "& .issue-lease-content .select-input-box .input.select-input": {
      padding: "12px 15px",
    },
    "& .issue-lease-content .select-input-box .input.select-input .MuiInputAdornment-positionStart": {
      marginRight: "25px",
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
    "& .issue-lease-content": {
      "& .map-span": {
        textAlign: "end",
        fontWeight: 600,
        marginTop: "10px",
        cursor: "pointer",
        "& span": {
          color: "#FC8434",
        },
      },
      "& .type-radio-select": {
        marginTop: "15px",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "10px",
        "& .MuiFormControlLabel-root": {
          border: "1px solid lightgrey",
          borderRadius: "25px",
          padding: "5px 10px",
          fontWeight: 600,
          margin: 0,
          boxSizing: "border-box",
          width: "48%",
          "& .Mui-checked": {
            "& span": {
              color: "#FC8434",
            },
          },
        },
        "& .rented.MuiFormControlLabel-root": {
          "& span.MuiTypography-root": {
            fontWeight: 600,
            color: "#939292",
          },
        },
        "& .non-rented.MuiFormControlLabel-root": {
          "& span.MuiTypography-root": {
            fontWeight: 600,
            color: "#2B6FED",
          },
        },
      },
      "& .add-rent-history-btn": {
        width: "100%",
        margin: "15px 0",
        fontSize: "16px",
        fontWeight: 600,
        border: "1px solid lightgrey",
        borderRadius: "25px",
        padding: "10px",
      },
      "& .rent-history-box": {
        padding: "12px 20px",
        margin: "10px 0",
        border: "1px solid lightgrey",
        borderRadius: "8px",
        "& .heading": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
        "& .box-icons": {
          display: "flex",
          alignItems: "center",
          gap: "20px",
          "& img": {
            cursor: "pointer",
          },
        },
      },
      "& .rent-history-box.unit-box": {
        padding: "15px 20px",
        boxShadow: "4px 0px 14px 0px #ECECEC",
        border: "0",
        "& .unit-info": {
          marginTop: "15px",
          "& span": {
            color: "#C3C3C3",
          },
          "& p": {
            marginTop: "2px",
          },
        },
      },
    },
    "& .success-page": {
      height: "calc(100% - 100px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "20px",
      "& p": {
        textAlign: "center",
      },
    },
    "& .pending-page": {
      height: "calc(100% - 160px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "20px",
      "& p": {
        textAlign: "center",
      },
    },
    "& .pending-buttons": {
      display: "flex",
      padding: "10px 0",
      background: "white",
      boxShadow: "none",
      marginTop: "20px",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "10px",
      "& .okay": {
        color: "#8D8D8D",
        background: "white",
      },
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
      fontWeight: 600,
    },
    "& .error": {
      color: "red",
      // marginTop: "10px",
      marginLeft: "20px",
      fontSize: "14px",
    },
    "& ::placeholder": {
      color: "black",
      opacity: 1,
    },
    "& :-ms-input-placeholder": {
      color: "black",
      opacity: 1,
    },
    "& ::-ms-input-placeholder": {
      color: "black",
      opacity: 1,
    },
    "& .form.issue-lease-content .next-button": {
      position: "sticky",
      bottom: 0,
    },
    "& .mobile-box": {
      display: "flex",
      alignItems: "center",
      background: "#F9F9F9",
      border: "1px solid #F0F0F0",
      borderRadius: "30px",
      marginTop: "18px",
    },
    "& .mobile-box .mobile-select": {
      width: "120px",
      borderRadius: "30px",
      background: "#F9F9F9",
    },
    "& .mobile-box .mobile-select .MuiSelect-root": {
      borderRadius: "30px",
      background: "#F9F9F9",
    },
    "& .mobile-box .divider": {
      width: "2px",
      height: "40px",
      margin: "0 20px",
      background: "#F0F0F0",
    },
    "& .mobile-box .mobile-input": {
      width: "100%",
    },
    "& .mobile-box .mobile-input:before": {
      border: 0,
    },
    "& .mobile-box .mobile-input:after": {
      border: 0,
    },
    "& .mobile-box .mobile-input .MuiInputBase-input": {
      paddingLeft: 10,
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
    "& .issue-lease-content .pdf-box": {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      border: "1px solid #F0F0F0",
      borderRadius: "8px",
      padding: "5px",
      marginTop: "10px",
      "& .pdf-info": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        "& h4": {
          wordBreak: "break-all",
          fontWeight: "500",
          fontSize: "14px",
        },
      },
    },
  },
  managerDetails: {
    "& .top-bar": {
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
      cursor: "pointer",
      background: "#FFFFFF",
      padding: "10px 20px",
      justifyContent: "space-between",
      position: "sticky",
      top: "0",
      zIndex: "999999",
    },
    "& .top-bar .left-icon": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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
      color: "black",
      textDecoration: "none !important",
    },
    "& .list-box": {
      height: "85vh",
    },
    "& .list-box .content-box": {
      height: "calc(100% - 78px)",
    },
    "& .faq-step .MuiContainer-root": {
      overflowY: "auto",
      overflowX: "hidden",
    },
    "& .details-box-item": {
      margin: "15px 0",
      "& h4": {
        marginBottom: "10px",
      },
      "& .MuiCard-root": {
        boxShadow: "none",
        borderRadius: "8px",
        padding: "15px 25px",
        "& .box-item": {
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          "& .box-item-content span": {
            fontSize: "14px",
            lineHeight: "14px",
          },
          "& .box-item-content p": {
            fontWeight: "600",
            marginTop: "5px",
          },
        },
        "& .heading-box-item": {
          display: "flex",
          gap: "5px",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: "10px",
          "& .right-box-item": {
            display: "flex",
            gap: "20px",
            alignItems: "center",
          },
          "& .right-box-item span": {
            fontWeight: "600",
            color: "#FC8434",
          },
        },
      },
    },
    "& .list-box .content-box .heading-box-item": {
      marginBottom: "0 !important",
    },
    "& .list-box .content-box .heading-box-item h4": {
      marginBottom: "0 !important",
    },
    "& .pdf-content-box": {
      marginBottom: "15px",
      "& .MuiCard-root": {
        padding: "20px",
        boxShadow: "none",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& .heading": {
          display: "flex",
          alignItems: "center",
          gap: "15px",
        },
      },
    },
    "& .list-box > .button-box": {
      background: "transparent",
      marginBottom: "0",
    },
    "& .button-box": {
      marginBottom: "15px",
      gap: "15px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "sticky",
      bottom: 0,
      background: "white",
      width: "100%",
      padding: "10px 0",
      "& button": {
        borderRadius: "25px",
        fontWeight: 600,
        padding: "15px 45px",
      },
      "& button.decline": {
        border: "1px solid #2B6FED",
        color: "#2B6FED",
      },
      "& button.accept": {
        background: "#2B6FED",
        color: "white",
      },
    },
  },
};
