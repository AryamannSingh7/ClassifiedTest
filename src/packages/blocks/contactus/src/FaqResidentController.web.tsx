import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

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
  faqStep: number;

  faq: string;

  faqList: any[];
  catagoriesList: any[];

  question: string;
  answer: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class FaqResidentController extends BlockComponent<
  Props,
  S,
  SS
> {
  FaqCategoryCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIRequestMessage),
    ];

    this.state = {
      faqStep: 1,

      faqList: [],
      catagoriesList: [],

      question: "",
      answer: "",

      faq: "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Get FAQ Category
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.FaqCategoryCallId !== null &&
      this.FaqCategoryCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.FaqCategoryCallId = null;

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson.data) {
        this.setState({
          ...this.state,
          catagoriesList: responseJson.data,
        });
      }

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        this.parseApiErrorResponse(responseJson);
      }
      this.parseApiCatchErrorResponse(errorReponse);
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    this.getFaqCategory();
  }

  // Get FAQ Category API
  getFaqCategory = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.FaqCategoryCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_interactive_faqs/interactive_faq_categories`
    );

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  changeFaqState = (number: number) => {
    this.setState({
      ...this.state,
      faqStep: number,
    });
  };
  // Customizable Area End
}
