export const FaqChairmanStyleWeb: any = {
  contactUs: {
    "& .navigation": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& .navigation .sub-heading": {
      fontWeight: 600,
      marginTop: 15,
      marginBottom: 15,
    },
    "& .contact-us-form": {
      background: "white",
      borderRadius: "5px",
      padding: "25px",
    },
    "& .contact-us-form .title-input": {
      borderRadius: 4,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "15px 26px 15px 12px",
      fontFamily: "GothamMedium",
      outline: "none",
      marginBottom: "15px",
    },
    "& .contact-us-form .select-input": {
      borderRadius: 4,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "15px 26px 15px 12px",
      fontFamily: "GothamMedium",
      color: "gray",
      marginBottom: "15px",
      background: "white",
    },
    "& .contact-us-form .textarea-input": {
      borderRadius: 4,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      height: "100px",
      outline: "none",
      marginBottom: "15px",
    },
    "& .contact-us-form button": {
      borderRadius: 4,
      border: "1px solid #2B6FEC",
      outline: "none",
      color: "#FFFFFF",
      background: "#2B6FEC",
      padding: "10px",
    },
  },
  subscriptionDetails: {
    "& .navigation": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& .navigation .sub-heading": {
      fontWeight: 600,
      marginTop: 15,
      marginBottom: 15,
    },
    "& .subscription-detail": {
      background: "white",
    },
    "& .subscription-detail .info .heading": {
      fontWeight: "600",
    },
    "& .subscription-detail .info a": {
      color: "#FE8335",
      textDecoration: "none",
    },
    "& .subscription-detail .info": {
      background: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "25px",
    },
    "& .subscription-detail .info.data": {
      padding: "15px 25px",
    },
  },
  faqChairman: {
    "& .navigation": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& .navigation .sub-heading": {
      fontWeight: 600,
      marginTop: 15,
      marginBottom: 15,
    },
    "& .category-box": {
      marginTop: "30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    "& .category-box .category": {
      display: "flex",
      maxWidth: "75%",
      overflowX: "auto",
      alignItems: "center",
    },
    "& .category-box .category .MuiTab-root": {
      borderRadius: "25px",
      background: "#EDF0F9",
      marginRight: "10px",
      textTransform: "capitalize",
      fontSize: "16px",
      padding: "6px 20px",
      minWidth: "auto",
      minHeight: "auto",
      color: "gray",
    },
    "& .category-box .category .MuiTab-root.active": {
      background: "#2C6DF3",
      color: "white",
    },
    "& .category-box Button": {
      borderRadius: "25px",
      background: "#FE8335",
      color: "white",
      marginRight: "10px",
      textTransform: "capitalize",
      fontSize: "16px",
      padding: "6px 20px",
      minWidth: "auto",
      minHeight: "auto",
    },
    "& .faq-box": {
      marginTop: "30px",
    },
    "& .faq-box .Mui-expanded": {
      margin: "0",
    },
    "& .faq-box .MuiAccordionSummary-root.Mui-expanded": {
      minHeight: "70px",
    },
    "& .faq-box .MuiAccordionSummary-content p": {
      fontWeight: "600",
    },
    "& .faq-box .MuiAccordionSummary-root": {
      minHeight: "70px",
    },
    "& .faq-box .MuiAccordionSummary-content": {
      justifyContent: "space-between",
    },
    "& .faq-box .icons .MuiSvgIcon-root": {
      color: "#FE8335",
      margin: "0 5px",
    },
    "& .faq-box .MuiTypography-root": {
      width: "93%",
    },
    "& .bottom-buttons": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "30px",
    },
    "& .bottom-buttons button:first-child": {
      color: "#FF4C67",
      borderColor: "#FF4C67",
    },
    "& .bottom-buttons button:last-child": {
      color: "#FFFFFF",
      borderColor: "#2B6FEC",
      background: "#2B6FEC",
    },
    "& .select-category": {
      borderRadius: 4,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
    },
    "& .empty-box": {
      width: "100%",
      height: "700px",
      background: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      borderRadius: "5px",
      marginTop: "30px",
    },
  },
  faqOwner: {
    "& .backIcon": {
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
      cursor: "pointer",
      marginBottom: "18px",
      background: "#FFFFFF",
      padding: "20px",
    },
    "& .backIcon svg": {
      marginRight: "18px",
    },
    "& .faq-item": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px",
      margin: "10px 0",
      background: "white",
      cursor: "pointer",
      borderRadius: "8px",
    },
    "& .faq-ans": {
      padding: "20px",
      margin: "10px 0",
      background: "white",
      cursor: "pointer",
      borderRadius: "8px",
    },
    "& .faq-item p": {
      fontWeight: "600",
    },
    "& .faq-ans span": {
      display: "block",
      marginBottom: "20px",
    },
    "& .faq-step button": {
      color: "#FFFFFF",
      background: "#2B6FEC",
      padding: "15px",
      borderRadius: "25px",
    },
    "& .faq-list": {
      overflowY: "auto",
      height: "85vh",
    },
    "& .right-image": {
      padding: "25px 60px",
    },
  },
};
