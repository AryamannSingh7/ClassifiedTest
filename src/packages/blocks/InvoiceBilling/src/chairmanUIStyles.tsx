import {Button, withStyles} from "@material-ui/core";

export const dashBoardActions = {
    navigation:{
        display: "flex",
        justifyContent: "space-between",
    },
    subHeading: {
        fontWeight:600,
        marginTop:15,
        marginBottom: 20,
        marginLeft:10
    },
    YearMain:{
        background: "#fff",
        border: "1px solid #dfd4d4",
        borderRadius: 5,
        paddingLeft:15,
        paddingRight: 15,
    },
    Cards: {
        paddingTop: 30,
        paddingLeft: 15,
        paddingBottom: 25,
        background: "#fff",
        borderRadius: 10,
    },
    CardsIcons:{
        border: "1px solid #d9d4d3",
        borderRadius: "50%",
        width: 25,
        height: 25,
        padding: 15,
        color:"#054c94",
    },
    bottomColor:{
        color: "red"
    },
    bottomTwoSpan:{
        display: "flex",
        gap: 5,
        marginTop: 10
    },
    TableHeader:{
        display: "flex",
        borderBottom: "1px solid grey",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 55,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: "#fff",
        borderRadius: '10px',
        // boxShadow: theme.shadows[5],
        padding: "16px 32px 24px",
        width:"700px",
        overflow:"hidden",
        minHeight:"500px"
    },
    modalHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin:"10px 0px 20px 0px"
    },
    subHeadingFont:{
        fontWeight:600
    },
    genrateReceipt:{
        display: "flex",
        alignItems:'center'
    },
    commonColor:{
        color:"#181d257a"
    },
    residetails:{
        marginTop:15
    },
    summary:{
        backgroundColor:"#F9F9F9",
        padding:"10px 20px 20px",
        marginTop:15,
        boxShadow:"0px"
    },
    receiptbtn:{
        borderRadius:8,
        width:"100%",
        backgroundColor:"#2b6fed",
        height:45,
        fontWeight:600,
        color:"#fff"
    },
    paymentbtn:{
        borderRadius:8,
        width:"170px",
        backgroundColor:"#2b6fed",
        height:45,
        fontWeight:600,
        color:"#fff"
    },
    receiptCancel:{
        borderRadius:8,
        width:"170px",
        backgroundColor:"white",
        height:45,
        fontWeight:600,
        color:"#2b6fed",
        marginRight:"15px",
        border:"1px solid #2b6fed"
    },
    expenseModalHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin:"5px 0px 0px 0px"
    },
    expensePaper: {
        backgroundColor: "#fff",
        borderRadius: '10px',
        // boxShadow: theme.shadows[5],
        padding: "10px 16px 10px",
        width:"700px",
        overflow:"hidden",
        minHeight:"500px"
    },
};

export const CloseButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        width:"175px",
        fontWeight:"bold",
        borderRadius:"8px",
        height:"55px",
        '&:hover': {
            backgroundColor: "#2b6fef",
        },
    },
}))(Button);

export const PublishButton = withStyles((theme) => ({
    root: {
        color: "#2b6fed",
        backgroundColor: "white",
        width:"175px",
        fontWeight:"bold",
        borderRadius:"8px",
        border:"1px solid #2b6fed",
        height:"55px",
        '&:hover': {
            color: "#2b6fef",
        },
    },
}))(Button);