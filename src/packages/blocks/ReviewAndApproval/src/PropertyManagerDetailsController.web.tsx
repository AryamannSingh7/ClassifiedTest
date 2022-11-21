import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import * as Yup from "yup";
import toast from "react-hot-toast";

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  loading: boolean;
  isEditPropertyModalOpen: boolean;

  propertyManagerId: string;

  propertyManagerDetails: PropertyManagerDetails;

  propertyId: string;
  propertyForm: PropertyForm;
  // Customizable Area End
}

interface PropertyForm {
  country: string;
  city: string;
  buildingId: string;
  unitId: string;
  buildingName: string;
  unitName: string;
  startDate: string;
  endDate: string;
  feeType: string;
  rent: string;
}

interface PropertyManagerDetails {
  managerName: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  IdType: string;
  IdNumber: string;
  IdDate: string;
  IdPdfDocument: string;
  propertyList: any[];
}

interface SS {
  id: any;
}

export default class PropertyManagerDetailsController extends BlockComponent<Props, S, SS> {
  GetPropertyManagerDetailsCallId: any;
  GetComplexDetailsCallId: any;
  EditPropertyCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,
      isEditPropertyModalOpen: false,

      propertyManagerId: "",

      propertyManagerDetails: {
        managerName: "",
        companyName: "",
        phoneNumber: "",
        email: "",
        IdType: "",
        IdNumber: "",
        IdDate: "",
        IdPdfDocument: "",
        propertyList: [],
      },

      propertyId: "",
      propertyForm: {
        country: "",
        city: "",
        buildingId: "",
        unitId: "",
        buildingName: "",
        unitName: "",
        startDate: "",
        endDate: "",
        feeType: "",
        rent: "",
      },
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Get Property Manager Detail - API
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetPropertyManagerDetailsCallId !== null &&
      this.GetPropertyManagerDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetPropertyManagerDetailsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      console.log(responseJson.data);
      if (responseJson && responseJson.data) {
        const manager = responseJson.data;
        this.setState({
          propertyManagerDetails: {
            managerName: manager.attributes.name,
            companyName: manager.attributes.company_name,
            phoneNumber: manager.attributes.mobile_number,
            email: manager.attributes.email,
            IdType: manager.attributes.id_proof.name,
            IdNumber: manager.attributes.id_number,
            IdDate: manager.attributes.id_expiration_date,
            IdPdfDocument: manager.attributes.image.url,
            propertyList: manager.attributes.properties,
          },
        });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Complex Details - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetComplexDetailsCallId !== null &&
      this.GetComplexDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetComplexDetailsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson && responseJson.complex && responseJson.complex_address) {
        this.setState({
          propertyForm: {
            ...this.state.propertyForm,
            country: responseJson.complex_address.country,
            city: responseJson.complex_address.city,
          },
        });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Edit Property - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.EditPropertyCallId !== null &&
      this.EditPropertyCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.EditPropertyCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      this.setState({ loading: false }, () => {
        if (responseJson) {
          toast.success("Property details change successfully");
          this.getPropertyManagerDetails();
        }
      });

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    const manager_id = this.props.navigation.getParam("id");
    this.setState({ propertyManagerId: manager_id }, () => {
      this.getPropertyManagerDetails();
      this.getComplexDetails();
    });
  }

  getPropertyManagerDetails = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetPropertyManagerDetailsCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_property_manager/property_manager_requests/${this.state.propertyManagerId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  getComplexDetails = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetComplexDetailsCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_request_management/find_complex?society_management_id=${society_id}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  editProperty = (values: any) => {
    let body = {
      properties: {
        building_management_id: values.buildingId,
        apartment_management_id: values.unitId,
        start_date: values.startDate,
        end_date: values.endDate,
        fees_type: values.feeType,
        fixed_persentage_of_rent: values.rent,
      },
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.EditPropertyCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_property_manager/properties/${this.state.propertyId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePut);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  registerPropertyFormSchema: any = Yup.object().shape({
    buildingId: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    unitId: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    startDate: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    endDate: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    feeType: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    rent: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
  });

  handleEditPropertyModal = () => {
    this.setState({ isEditPropertyModalOpen: !this.state.isEditPropertyModalOpen });
  };
  // Customizable Area End
}
