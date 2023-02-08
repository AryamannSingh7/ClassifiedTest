// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";


export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;

  classes: any;

}

interface S {
  openModal:boolean;
  selectedFile:any;
}

interface SS {
  id: any;
}

export default class ExpenseReportController extends BlockComponent<Props, S, SS> {
  upload: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;

    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      openModal:true,
      selectedFile:{}
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    console.log("CHECK")
  }

}
// Customizable Area End
