// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import CommonApiCallForBlockComponent from "../../../components/src/ApiCallCommon.web";

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  classes: any;
}

interface S {
  selectedYear:any;
  invitationData:any;
}

interface SS {
  id: any;
}

export default class InvitationReportController extends CommonApiCallForBlockComponent<Props, S, SS> {
  getInvitationReportId:string = ""
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];
    this.state = {
      selectedYear:new Date().getFullYear(),
      invitationData:{},
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount(): Promise<void> {
    this.getInvitationReport()
  }

  manageChangeYear = (e:any) => {
    this.setState({
      selectedYear:e.target.value
    })
  }

  getInvitationReport = async () => {
    const societyID = localStorage.getItem("society_id")
    this.getInvitationReportId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `society_managements/${societyID}/bx_block_report/invitation_reports/request_count`,
    });
  }
  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      if(apiRequestCallId === this.getInvitationReportId){
        this.setState({
          invitationData:responseJson
        })
      }
    }
  }

}
// Customizable Area End
