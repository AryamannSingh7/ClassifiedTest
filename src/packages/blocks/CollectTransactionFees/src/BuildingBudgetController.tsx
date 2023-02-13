// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import CommonApiCallForBlockComponent from "../../../components/src/ApiCallCommon.web";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  history:any;
  match:any;
  location:any; 
}

interface S {
  budgetList:any;
  budgetYear:any;
  buildingList:any;
  complexName:any;
}

interface SS {
  id: any;
}

export default class BuildingBudgetController extends CommonApiCallForBlockComponent<
  Props,
  S,
  SS
> {

  getBuildingListBudgetListId: string = "";
  getBudgetListResidentId: string = "";

  constructor(props: Props) {

    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
    ]
    
    this.state = {
      budgetList:[],
      budgetYear:new Date().getFullYear(),
      buildingList:[],
      complexName:""
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {

  }


  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.getBudgetListResidentId === apiRequestCallId ){
        console.log(responseJson,errorReponse)
      }
    }
  }


}

// Customizable Area End
