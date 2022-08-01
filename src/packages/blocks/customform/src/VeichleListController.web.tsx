import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import * as Yup from 'yup';
export const Colors = {
  inputLabel: "rgba(31, 31, 34, 0.6)",
  inputTextColor: "rgb(31, 31, 34)",
  borderGrey: "rgba(28, 28, 30, 0.3)",
  borderYellow: "rgb(205, 149, 12)",
  white: "#FFFFFF",
  modalBg: "rgb(243, 243, 243)",
};

const options = {
  title: "Select Image",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  getSellerDetailsMessageId: any;
  postSellerDetailsMessageId: any;
  sellerID: any;
  shopName: string;
  address: string;
  gstin: string;
  selectedServices: number[];
  showSuccessModal: boolean;
  token: string;
  lat: any;
  long: any;
  error: string | null;
  loading:boolean;
  allVehcile:any[];
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class VeichleListController extends BlockComponent<Props, S, SS> {
    // Customizable Area Start
  createVehicleApiCallId:string='';
  getVehicleListApiCallId:string='';
      // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIRequestMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];
    this.state = {
      getSellerDetailsMessageId: "",
      postSellerDetailsMessageId: "",
      sellerID: "",
      shopName: "",
      address: "",
      gstin: "",
      selectedServices: [],
      token: "",
      showSuccessModal: false,
      lat: 0,
      long: 0,
      error:null,
      loading:false,
      allVehcile:[],
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
      this.getSellerDetail(token)
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      console.log("API REQUEST CALL ID: ", apiRequestCallId);

      if (apiRequestCallId && responseJson) {
        if (apiRequestCallId === this.state.postSellerDetailsMessageId) {
          this.showModal();
          console.log("Received from post API: ", responseJson);
        }

        if (apiRequestCallId === this.state.getSellerDetailsMessageId) {
          console.log("Received from get API: ", responseJson);
          if (responseJson.data && responseJson.data.attributes) {
            console.log(
              "responseJson.data.attributes ",
              responseJson.data.attributes
            );
            let isWholesalerSelected =
              responseJson.data.attributes.wholesaler != undefined
                ? responseJson.data.attributes.wholesaler
                : false;
            let isRetailerSelected =
              responseJson.data.attributes.retailer != undefined
                ? responseJson.data.attributes.retailer
                : false;
            let isManufacturerSelected =
              responseJson.data.attributes.manufacturer != undefined
                ? responseJson.data.attributes.manufacturer
                : false;
            let isHallmarking_centerSelected =
              responseJson.data.attributes.hallmarking_center != undefined
                ? responseJson.data.attributes.hallmarking_center
                : false;

            let selectedServices = [];

            if (isWholesalerSelected) {
              selectedServices.push(1);
            }
            if (isManufacturerSelected) {
              selectedServices.push(2);
            }
            if (isHallmarking_centerSelected) {
              selectedServices.push(3);
            }
            if (isRetailerSelected) {
              selectedServices.push(4);
            }

            this.setState({
              sellerID: responseJson.data.id,
              shopName: responseJson.data.attributes.firm_name
                ? responseJson.data.attributes.firm_name
                : "",
              address: responseJson.data.attributes.location
                ? responseJson.data.attributes.location
                : "",
              gstin: responseJson.data.attributes.gstin_number
                ? responseJson.data.attributes.gstin_number
                : "",
              selectedServices: selectedServices,
            });
          }
        } if (apiRequestCallId === this.createVehicleApiCallId) {
          if (!responseJson.errors) {
            console.log(responseJson)
            //@ts-ignore
            //@ts-nocheck
            this.setState({ loading: false })
            //@ts-ignore
            //@ts-nocheck
            if (this.props.history.location.state?.data) {
              //@ts-ignore
              //@ts-nocheck
              this.props.history.push('/veichleList')
            }
                    } else if (responseJson?.errors) {
            let error = responseJson.errors[0];
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
            this.parseApiCatchErrorResponse(this.state.error);
          }
          this.setState({ loading: false })

        } if (apiRequestCallId === this.getVehicleListApiCallId) {
          if (!responseJson.errors) {
            console.log(responseJson)
            this.setState({ allVehcile: responseJson.vehicle.data })
          } else {
            //Check Error Response
            this.parseApiErrorResponse(responseJson);
          }

          this.parseApiCatchErrorResponse(errorReponse);
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start


  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };


  labelShopName: string = "Name of Shop";
  labelAddress: string = "Address";
  labelGstin: string = "GSTIN";
  labelAbout: string = "About Us";
  labelServiceProvided: string = "Services Provided";
  labelDealsIn: string = "Deals in";
  labelShopPhotos: string = "Shop Photos(Min 1 - Max 8)";
  labelVisitingCard: string = "Upload Visiting Card";
  btnLabel: string = "Submit";
  btnContinueLabel: string = "Continue";

  services = [
    { label: "Wholesaler", value: 1 },
    { label: "Manufacturer", value: 2 },
    { label: "Hallmarker", value: 3 },
    { label: "Retailer", value: 4 },
  ];

  getSellerDetail = async (token: string) => {

    const header = {
      "Content-Type": configJSON.sellerDetailsApiContentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.setState({
      getSellerDetailsMessageId: requestMessage.messageId,
    });

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.sellersAPIEndPoint + "/1"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getSellersAPIMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  submitSellerDetails = async () => {

    let token = this.state.token;

    if (!token || token.length === 0) {
      this.showAlert("Error", "Invaild Token. Plese log in.")
      return;
    }
    if (
      this.state.shopName.trim() == ""
    ) {
      this.showAlert("Error", configJSON.errorMessageShopName);
      return;
    }

    const header = {
      "Content-Type": configJSON.sellerDetailsApiContentType,
    };

    let isWholesalerSelected = false;
    let isRetailerSelected = false;
    let isManufacturerSelected = false;
    let isHallmarking_centerSelected = false;

    this.state.selectedServices.forEach((value) => {
      switch (value) {
        case 1:
          isWholesalerSelected = true;
          break;
        case 2:
          isManufacturerSelected = true;
          break;
        case 3:
          isHallmarking_centerSelected = true;
          break;
        case 4:
          isRetailerSelected = true;
          break;
      }
    });

    const httpBody = {
      token: token,
      seller_account: {
        firm_name: this.state.shopName,
        location: this.state.address,
        gstin_number: this.state.gstin,
        wholesaler: isWholesalerSelected,
        retailer: isRetailerSelected,
        manufacturer: isManufacturerSelected,
        hallmarking_center: isHallmarking_centerSelected,
        lat: this.state.lat,
        long: this.state.long,
      },
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.setState({
      postSellerDetailsMessageId: requestMessage.messageId,
    });


    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      this.state.sellerID.length > 1 ? configJSON.sellersAPIEndPoint + "/" + this.state.sellerID : configJSON.sellersAPIEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      this.state.sellerID.length > 1 ? configJSON.sellerDetailsAPIMethodPUT : configJSON.sellerDetailsAPIMethodPOST
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  onChangeInput = (name: string, value: any) => {
    // @ts-ignore
    this.setState({ [name]: value });
  };

  txtInputProps = (key: string) => ({
    // @ts-ignore
    value: this.state[key],
    onChangeText: (text: string) => {
      this.onChangeInput(key, text);
    },
  });

  inputLabelProps = {
    fontSize: 14,
    color: Colors.inputLabel,
    lineHeight: 16,
  };

  onServiceSelected = (serviceId: number) => {
    if (!this.state.selectedServices.includes(serviceId)) {
      this.setState({
        selectedServices: this.state.selectedServices.concat(serviceId),
      });
    }
  };

  onServiceUnSelected = (serviceId: number) => {
    this.setState({
      selectedServices: this.state.selectedServices.filter(
        (selectedService) => selectedService !== serviceId
      ),
    });
  };

  showModal = () => {
    this.setState({ showSuccessModal: true });
  };

  hideModal = () => {
    this.setState({ showSuccessModal: false }, () => {
    });
  };

  addVehicleSchema(){
    const validations = Yup.object().shape({

      full_name: Yup.string().required(`This field is required`).trim(),
      plateNumber: Yup.string().required(`This field is required`).trim(),
      carManufacturer: Yup.string().required(`This field is required`).trim(), carModle: Yup.string().required(`This field is required`).trim(), carColor: Yup.string().required(`This field is required`).trim(),
      banner: Yup.mixed(),
      bannerUrl: Yup.string().nullable(true).required(`Please select banner image.`)

    });
    return validations
  }

  createVehicle=async(values:any)=>{
    console.log(values)
    try {
      const header = {

        token: localStorage.getItem("userToken")
      };
      const formData = new FormData();
      formData.append("vehicle[owner_name]", values.full_name)
      formData.append("vehicle[owner_name]", values.plateNumber)
      formData.append("vehicle[owner_name]", values.carManufacturer)
      formData.append("vehicle[owner_name]", values.carModle)
      formData.append("vehicle[owner_name]", values.carColor)
      let blob = await fetch(values.bannerUrl).then(r => r.blob());
      formData.append(
        "vehicle[registration_card_copy]",
        blob
      );
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.createVehicleApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.endPointApiCreateVehicle
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        formData
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.exampleAPiMethod
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;

    } catch (error) {
      // this.setState({ loading: false })
      console.log(error);
    }

}
  handleSelectBanner = (
    e: any,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    setFieldError: (field: string, message: string) => void,
  ) => {

    let file = e?.target?.files[0];

    if (file && !['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      return setFieldError('banner', 'Only png and jpeg are supported.')
    }

    setFieldValue("banner", file ? {
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      name: file.name,
      size: file.size,
      type: file.type
    } : '');
    setFieldValue("bannerUrl", file ? URL.createObjectURL(file) : "");
    if (file) {
      e.target.value = "";

    }

  };
  getVehicle() {

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
      "token": localStorage.getItem('userToken')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );


    this.getVehicleListApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_vehicle/vehicles`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );



    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  addVehicle(item:any){
    console.log(item)
    localStorage.setItem('selectCar',JSON.stringify(item))
    // @ts-nocheck
    // @ts-ignore
    this.props.history.push('/viewVehicle')

  }
  getCar(){
    // @ts-nocheck
    // @ts-ignore
    let item = JSON.parse(localStorage.getItem('selectCar'))
    if(item){

    }
  }
  checkVehicle(){
    console.log('ds')
if(this.state.allVehcile.length<1){
// @ts-nocheck
    // @ts-ignore
  this.props.history.push("/newVeichleList")
}else{
  // @ts-nocheck
    // @ts-ignore
  this.setState({showDailog:true},()=>console.log(this.state))
}

  }
  // Customizable Area End
}