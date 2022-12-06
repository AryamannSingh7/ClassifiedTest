import { v4 as uuidv4 } from "uuid";
import { runEngine } from "../../../framework/src/RunEngine";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";

export default class AddExpenseAdapter {
  send: (message: Message) => void;

  constructor() {
    const blockId = uuidv4();
    this.send = (message) => runEngine.sendMessage(blockId, message);
    runEngine.attachBuildingBlock(this as IBlock, [getName(MessageEnum.NavigationAddExpenseMessage)]);
  }

  convert = (from: Message): Message => {
    const to = new Message(getName(MessageEnum.NavigationMessage));

    to.addData(getName(MessageEnum.NavigationTargetMessage), "AddExpense");

    to.addData(getName(MessageEnum.NavigationPropsMessage), from.getData(getName(MessageEnum.NavigationPropsMessage)));

    const raiseMessage = new Message(getName(MessageEnum.NavigationPayLoadMessage));

    raiseMessage.addData(
      getName(MessageEnum.AddExpenseDataMessage),
      from.getData(getName(MessageEnum.AddExpenseDataMessage))
    );

    to.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

    return to;
  };

  receive(from: string, message: Message): void {
    this.send(this.convert(message));
  }
}
