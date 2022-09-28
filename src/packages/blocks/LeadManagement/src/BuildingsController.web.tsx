import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import * as Yup from "yup";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface DocumentCount {
  policy: number;
  guidelines: number;
  roles: number;
  resolution: number;
  buildingPlans: number;
}

interface S {
  // Customizable Area Start
  imageBox: boolean;
  photoIndex: number;

  currentTab: number;

  isEditBuildingModalOpen: boolean;

  dataSearch: any;

  documentCount: DocumentCount;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class BuildingsController extends BlockComponent<Props, S, SS> {
  GetDocumentCountCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      imageBox: false,
      photoIndex: 0,

      currentTab: 0,

      isEditBuildingModalOpen: false,

      dataSearch: "",

      documentCount: {
        policy: 0,
        guidelines: 0,
        roles: 0,
        resolution: 0,
        buildingPlans: 0,
      },
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    // Get Document Count API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetDocumentCountCallId !== null &&
      this.GetDocumentCountCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetDocumentCountCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({
          documentCount: {
            policy: responseJson.data.policy_count,
            guidelines: responseJson.data.guideline_count,
            roles: responseJson.data.role_count,
            resolution: responseJson.data.resolution_count,
            buildingPlans: responseJson.data.building_plan_count,
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
    // Customizable Area End
  }

  async componentDidMount(): Promise<void> {
    this.getDocumentCount();
  }
  
  // Get Document Count API
  getDocumentCount = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetDocumentCountCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_my_document/document_count`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Handle State
  slider: any;
  nextImage = () => {
    this.slider.slickNext();
  };
  previousImage = () => {
    this.slider.slickPrev();
  };
  
  handleTabChange = (event: any, newValue: number) => {
    this.setState({ currentTab: newValue });
  };

  handleEditBuildingModal = () => {
    this.setState({ isEditBuildingModalOpen: !this.state.isEditBuildingModalOpen });
  };

  EditSchema() {
    const validations = Yup.object().shape({
      countryname: Yup.string().required(`This field is required`),
      buildingname: Yup.string().required(`This field is required`),
      buildingarea: Yup.string().required(`This field is required`),
      totalfloors: Yup.string().required(`This field is required`),
      totalunits: Yup.string().required(`This field is required`),
      purchasedate: Yup.string().required(`This field is required`),
      currentvaluation: Yup.string().required(`This field is required`),
      size: Yup.string().required(`This field is required`),
    });
    return validations;
  }
  // Customizable Area End
}
