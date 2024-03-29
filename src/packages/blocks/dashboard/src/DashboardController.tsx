import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  dashboardData: any;
  token: string;
  errorMsg: string;
  loading: boolean;
  Year: any;
  expanded: any;
  anchorEl:any;

  isMenuOpen: boolean;
  isLogoutModalOpen: boolean;

  isNewNotification: boolean;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class DashboardController extends BlockComponent<Props, S, SS> {
  apiDashboardItemCallId: string = "";
  dashboardApiCallId: string = "";
  apiGetQueryStrinurl: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage)
    ];

    this.state = {
      dashboardData: [],
      errorMsg: "",
      token: "",
      loading: false,
      Year: "",
      expanded: '',
      anchorEl:null,

      isLogoutModalOpen: false,
      isMenuOpen: false,

      isNewNotification: false,
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener('willFocus', () => {
        this.getToken();
      });
    }
  }
  
  getToken=()=>{
    const msg: Message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(msg);
  }

  getDashboardData(): boolean {
    // Customizable Area Start
    const header = {
      "Content-Type": configJSON.dashboarContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiDashboardItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.dashboardGetUrl
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token, loading: true }, () => {
        this.getDashboardData();
      });
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson && !responseJson.errors && responseJson.data) {
        this.handleChairmanResponse(responseJson);
      } else {
        let errorResponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );

        this.handleChairmanErrorResponse(errorResponse);
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  handleChange = (event:any) => {
    this.setState({ Year: event.target.value });
  };

  handleAccordinoChange = (panel:string) => (event:any, isExpanded:boolean) => {
    this.setState({ expanded: isExpanded ? panel : '' });
  };

  handleChairmanResponse = (responseJson: any) => {
    if (responseJson?.data?.length === 0) {
      this.setState({ errorMsg: "Data Not Found", loading: false });
    } else {
      this.setState({ dashboardData: responseJson.data, errorMsg: "", loading: false });
    }
  }

  handleChairmanErrorResponse = (errorResponse: any) => {
    if (errorResponse === undefined) {
      this.setState({ errorMsg: "Something went wrong", loading: false });
    } else {
      this.setState({ errorMsg: errorResponse, loading: false });
    }
  }

  handleNewNotificationChairmanResponse = (responseJson: any) => {
    this.setState({isNewNotification: responseJson.new_notification})
  }
  // Customizable Area End

}
