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
      borderBottom: "2px solid #F2F2F2",
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
    "& .tenant-empty-list p": {
      fontSize: "16px",
      lineHeight: "20px",
    },
    "& .right-menu button": {
      padding: "0px",
    },
    "& .tenant-list-box .upload-button": {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px 0",
      background: "#F7F9FE",
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
      height: "100%",
      overflow: "hidden",
      maxHeight: "calc(100vh - 152px)",
      overflowY: "auto",
      position: "relative",
      marginTop: "15px",
      overflowX: "hidden",
    },
    "& .tenant-list-box .tenant": {
      borderRadius: "8px",
      boxShadow: "4px 0px 14px #e9e9e9",
      padding: "12px",
    },
    "& .tenant-list-box .tenant .city": {
      color: "#181D25",
      fontSize: "14px",
    },
    "& .tenant-list-box .tenant .header": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: "20px",
      marginBottom: "6px",
    },
    "& .tenant-list-box .tenant .header h4": {
      cursor: "pointer",
      fontSize: "16px",
    },
    "& .tenant-list-box .tenant .info": {
      marginTop: "5px",
    },
    "& .tenant-list-box .tenant .info span.header": {
      color: "black",
      fontSize: "14px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      wordBreak: "keep-all",
      display: "block",
      "-webkit-line-clamp": "1",
    },
    "& .tenant-list-box .tenant .info button": {
      display: "block",
      borderRadius: "25px",
      fontWeight: 600,
      padding: "4px 15px",
      background: "#ffeadc",
      color: "#FC8434",
      marginTop: "5px",
      "& span": {
        fontFamily: "Gotham_Bold !important",
      },
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
  registerUnit: {
    "& .top-bar": {
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
      cursor: "pointer",
      background: "#FFFFFF",
      padding: "10px 20px",
      justifyContent: "space-between",
      borderBottom: "2px solid #F2F2F2",
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
    "& .top-bar .left-icon span": {
      lineHeight: "18px",
      fontSize: "18px",
    },
    "& .right-image": {
      padding: "23px 60px",
    },
    "& a": {
      textDecoration: "none !important",
    },
    "& .page-container": {
      overflowY: "auto",
      height: "100%",
      maxHeight: "calc(100vh - 190px)",
    },
    "& .issue-lease-content .select-input-box .select-input": {
      background: "#F9F9F9",
      border: "1px solid #F0F0F0",
      borderRadius: "30px",
      marginTop: "18px",
      width: "100%",
      height: "56px",
      fontSize: "16px",
    },
    "& .issue-lease-content .select-input-box .select-input input::placeholder": {
      color: "#212121",
      opacity: 1,
    },
    "& .issue-lease-content .select-input-box .select-input input:-ms-input-placeholder": {
      color: "#212121",
      opacity: 1,
    },
    "& .issue-lease-content .select-input-box .select-input input::-ms-input-placeholder": {
      color: "#212121",
      opacity: 1,
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
      appearance: "none",
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
          border: "1px solid #F0F0F0",
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
            fontFamily: "Gotham_Bold !important",
          },
        },
        "& .non-rented.MuiFormControlLabel-root": {
          "& span.MuiTypography-root": {
            fontWeight: 600,
            color: "#2B6FED",
            fontFamily: "Gotham_Bold !important",
          },
        },
      },
      "& .add-rent-history-btn": {
        width: "100%",
        marginTop: "15px",
        fontSize: "16px",
        fontWeight: 600,
        border: "1px solid #DEDEDE",
        borderRadius: "25px",
        padding: "10px",
        fontFamily: "Gotham_Bold !important",
        "& span": {
          fontWeight: 600,
          fontFamily: "Gotham_Bold !important",
        },
      },
      "& .rent-history-box": {
        padding: "12px 20px",
        margin: "10px 0",
        border: "1px solid #F2F2F2",
        borderRadius: "8px",
        "& .heading": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
        "& .heading h4": {
          fontSize: "15px",
        },
        "& .tenant-name": {
          margin: "8px 0",
          fontSize: "14px",
        },
        "& .info-box": {
          marginTop: "8px",
        },
        "& .info": {
          marginBottom: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          "& span": {
            fontWeight: 600,
            color: "#FC8434",
            fontSize: "14px",
          },
          "& p": {
            fontSize: "14px",
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
      "& h4": {
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
      gap: "5px",
    },
    "& .next-button button": {
      minWidth: "300px",
      background: "#2b6fec",
      color: "white",
      padding: "12px 50px",
      borderRadius: "25px",
      fontWeight: 600,
    },
    "& .edit-submit-button.next-button button": {
      minWidth: "150px",
    },
    "& .edit-submit-button button.cancel": {
      background: "white",
      border: "1px solid #2b6fec",
      color: "#2b6fec",
    },
    "& .error": {
      color: "red",
      marginLeft: "20px",
      fontSize: "14px",
    },
    "& ::placeholder": {
      color: "#212121",
      opacity: 1,
    },
    "& :-ms-input-placeholder": {
      color: "#212121",
      opacity: 1,
    },
    "& ::-ms-input-placeholder": {
      color: "#212121",
      opacity: 1,
    },
    "& .form.issue-lease-content .next-button": {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
    },
    "& .unit-box-currency": {
      position: "relative",
      "& .unit-box-value": {
        position: "absolute",
        top: "36px",
        right: "36px",
        fontWeight: 600,
      },
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
      borderBottom: "2px solid #F2F2F2",
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
      height: "85vh",
      overflow: "auto",
    },
    "& .upload-button": {
      position: "sticky",
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px 0",
      background: "white",
    },
    "& .upload-button .MuiGrid-root": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    "& .upload-button button": {
      background: "#2b6fec",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      padding: "12px 50px",
      borderRadius: "25px",
      fontWeight: 600,
    },
    "& .tenant-detail-box .detail": {
      margin: "15px 0",
      "& .header": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& span": {
          fontWeight: 600,
          color: "#FC8434",
          cursor: "pointer",
          fontSize: "14px",
        },
        "& h4": {
          fontSize: "18px",
        },
      },
    },
    "& .tenant-detail-box .detail> h4": {
      fontSize: "18px",
    },
    "& .tenant-detail-box .detail .detail-box": {
      borderRadius: "8px",
      marginTop: "12px",
      boxShadow: "none",
      padding: "15px 20px",
      border: "1px solid #f2f2f2",
    },
    "& .tenant-detail-box .detail .detail-box .info-item": {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
    },
    "& .tenant-detail-box .detail .detail-box .info-item img": {
      marginTop: "5px",
    },
    "& .tenant-detail-box .detail .detail-box .info-item .item-data": {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    "& .tenant-detail-box .detail .detail-box .info-item span": {
      lineHeight: "20px",
      fontSize: "14px",
      color: "#121210",
    },
    "& .tenant-detail-box .detail .detail-box .info-item p": {
      fontWeight: 600,
      fontSize: "14px",
    },
    "& .tenant-detail-box .detail .detail-box .info-item p.tenant-link-text": {
      color: "#FC8434",
    },
    "& .rent-history-grid": {
      overflowX: "hidden",
      height: "85vh",
      background: "white",
    },
    "& .rent-history-grid .rent-history-box": {
      minHeight: "calc(100% - 80px)",
    },
    "& .view-all-text": {
      color: "#FC8434",
      fontSize: "14px",
    },
    "& .rent-history-box": {
      "& .header": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& span": {
          fontWeight: 600,
          cursor: "pointer",
        },
        "& span.Mui-checked": {
          fontWeight: 600,
          color: "#FC8434",
          cursor: "pointer",
        },
        "& h4": {
          fontSize: "18px",
        },
      },
      "& .rent-history": {
        padding: "12px 20px",
        margin: "10px 0",
        border: "1px solid #F2F2F2",
        borderRadius: "8px",
        "& .date": {
          margin: "6px 0 10px 0",
          color: "#121210",
          fontSize: "14px",
        },
        "& h4": {
          fontSize: "16px",
        },
        "& .left-side h4": {
          fontSize: "16px",
        },
        "& .MuiDivider-root": {
          background: "#F2F2F2",
        },
        "& .history-info-box": {
          marginTop: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        },
        "& .info": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          "& span": {
            fontWeight: 600,
            color: "#FC8434",
            fontSize: "14px",
          },
        },
      },
    },
    "& .images-box": {
      margin: "15px 0",
      overflow: "hidden",
      "& img": {
        width: "100px",
        height: "100px",
        borderRadius: "8px",
      },
      "& h4": {
        marginBottom: "10px",
        fontSize: "18px",
      },
      "& .slick-track": {
        display: "flex",
      },
      "& .slick-prev": {
        display: "none !important",
      },
      "& .slick-next": {
        display: "none !important",
      },
    },
  },
  tenantProfile: {
    "& .top-bar": {
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
      cursor: "pointer",
      background: "#FFFFFF",
      padding: "10px 20px",
      justifyContent: "space-between",
      zIndex: "9999",
      borderBottom: "2px solid #F2F2F2",
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
      height: "85vh",
      overflow: "auto",
    },
    "& .profile-top-box": {
      margin: "15px 0",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      "& .MuiAvatar-root": {
        width: "64px",
        height: "64px",
        marginBottom: "10px",
      },
      "& .profile-info-box": {
        marginTop: "10px",
        marginBottom: "10px",
        display: "flex",
        gap: "20px",
        padding: "15px 25px",
        background: "#F6F6F6",
        borderRadius: "25px",
        "& img": {
          cursor: "pointer",
          width: "20px",
          height: "20px",
        },
        "& div": {
          width: "3px",
          background: "#D6DBE4",
        },
      },
      "& .profile-add-info-box": {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "50px",
        "& span": {
          fontWeight: "600",
        },
      },
    },
    "& .profile-bottom-box": {
      "& .profile-item": {
        margin: "15px 0",
        "& h4": {
          marginBottom: "5px",
          fontSize: "18px",
        },
        "& .profile-hobby-box": {
          display: "flex",
          gap: "12px",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          "& span": {
            padding: "6px 12px",
            borderRadius: "25px",
            background: "#ffddc6",
            color: "#FC8434",
            fontSize: "14px",
            fontWeight: "600",
          },
        },
        "& .profile-social-box": {
          display: "flex",
          gap: "12px",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          "& img": {
            padding: "10px",
            background: "#F6F6F6",
            borderRadius: "50%",
            cursor: "pointer",
            width: "12px",
            height: "15px",
          },
        },
      },
    },
  },
};
