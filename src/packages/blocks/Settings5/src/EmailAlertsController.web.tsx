import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import { apiCall } from "../../../components/src/APICallComponent/index.web";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  t: (label: string) => string;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  isLeaseExpirationModal: boolean;
  isLeaseExpirationSetModal: boolean;

  leaseDetails: any;
  rentDetails: any;
  feeDetails: any;

  alertList: any;

  title: string;
  id: string;
  time: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class EmailAlertsController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  ExpenseReportCallId: string = "";
  LastYearsListCallId: string = "";
  GetEmailAlertDetailsCallId: string = "";
  UpdateEmailAlertStatusCallId: string = "";
  UpdateEmailTimeCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      // Customizable Area Start
      isLeaseExpirationModal: false,
      isLeaseExpirationSetModal: false,

      leaseDetails: {
        id: "",
        activated: "",
        timeLimit: "",
      },
      rentDetails: {
        id: "",
        activated: "",
        timeLimit: "",
      },
      feeDetails: {
        id: "",
        activated: "",
        timeLimit: "",
      },

      alertList: ["Lease Expiration Alert", "Rent Due Alert", "Management Fee Due"],

      title: "",
      id: "",
      time: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      let errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));

      switch (apiRequestCallId) {
        case this.GetEmailAlertDetailsCallId:
          this.handleGetEmailAlertResponse(responseJson);
          break;
        case this.UpdateEmailAlertStatusCallId:
          this.handleUpdateEmailAlertResponse(responseJson);
          break;
        case this.UpdateEmailTimeCallId:
          this.handleUpdateEmailTimeResponse(responseJson);
          break;
        default:
          break;
      }

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
    this.getEmailAlertDetails();
  }

  getEmailAlertDetails = async () => {
    this.GetEmailAlertDetailsCallId = await apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_emailnotifications/email_alerts`,
    });
  };

  handleGetEmailAlertResponse = (responseJson: any) => {
    if (responseJson && responseJson.email_alerts) {
      const lease = responseJson.email_alerts[0];
      const rent = responseJson.email_alerts[1];
      const fee = responseJson.email_alerts[2];
      this.setState({
        leaseDetails: {
          id: lease.id,
          activated: lease.activated,
          timeLimit: lease.time_limit,
        },
        rentDetails: {
          id: rent.id,
          activated: rent.activated,
          timeLimit: rent.time_limit,
        },
        feeDetails: {
          id: fee.id,
          activated: fee.activated,
          timeLimit: fee.time_limit,
        },
      });
    }
  };

  updateStatus = async (status: any, id: any) => {
    const body = {
      activated: status,
    };

    this.UpdateEmailAlertStatusCallId = await apiCall({
      contentType: "application/json",
      method: "PUT",
      endPoint: `bx_block_emailnotifications/email_alerts/${id}`,
      body: JSON.stringify(body),
    });
  };

  handleUpdateEmailAlertResponse = (responseJson: any) => {
    if (responseJson && responseJson.email_alert) {
      this.getEmailAlertDetails();
    }
  };

  updateEmailTime = async () => {
    const body = {
      time_limit: this.state.time,
    };

    this.UpdateEmailTimeCallId = await apiCall({
      contentType: "application/json",
      method: "PUT",
      endPoint: `bx_block_emailnotifications/email_alerts/${this.state.id}`,
      body: JSON.stringify(body),
    });
  };

  handleUpdateEmailTimeResponse = (responseJson: any) => {
    if (responseJson && responseJson.email_alert) {
      this.handleLeaseExpirationSetModal();
      this.getEmailAlertDetails();
    }
  };

  openLeaseExpirationModal = (title: any, id: any, time: any) => {
    this.setState({ title: title, id: id, time: time, isLeaseExpirationModal: !this.state.isLeaseExpirationModal });
  };

  closeLeaseExpirationModal = () => {
    this.setState({ isLeaseExpirationModal: !this.state.isLeaseExpirationModal });
  };

  handleLeaseExpirationSetModal = () => {
    this.setState({ isLeaseExpirationSetModal: !this.state.isLeaseExpirationSetModal });
  };
  // Customizable Area End
}
