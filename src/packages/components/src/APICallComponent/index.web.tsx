import { Message } from "../../../framework/src/Message";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

export const apiCall = async (data: any) => {
  const { contentType, method, endPoint, body } = data;

  const header = {
    "Content-Type": contentType,
    token: localStorage.getItem("userToken"),
  };

  const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

  apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), endPoint);

  apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

  body && apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));

  apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);

  runEngine.sendMessage(apiRequest.id, apiRequest);

  return apiRequest.messageId;
};
