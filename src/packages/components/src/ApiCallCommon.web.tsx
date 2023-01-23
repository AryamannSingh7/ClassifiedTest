// Customizable Area Start
import {IBlock} from "../../framework/src/IBlock";
import {Message} from "../../framework/src/Message";
import {BlockComponent} from "../../framework/src/BlockComponent";
import MessageEnum, {getName} from "../../framework/src/Messages/MessageEnum";
import {runEngine} from "../../framework/src/RunEngine";


export default class CommonApiCallForBlockComponent<Props, S, SS> extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  apiCall = async (data:any) => {
    const { contentType, method, endPoint, body } = data;

    const token = localStorage.getItem('userToken') ;

    const header = {
      "Content-Type": contentType,
      token
    };
    const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        endPoint
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        method
    );
    body && requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };
}
// Customizable Area End