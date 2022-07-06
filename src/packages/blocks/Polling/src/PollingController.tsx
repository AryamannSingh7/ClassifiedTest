import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";

import { boolean, date } from "yup";
import {Editor, EditorState} from 'draft-js';

// Customizable Area End
export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  Year: string;
  selectedDate:any,
  checked: boolean,
  editorState:any,
  PollData: any,
  InitialPollData: any,
  options: any,
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class PollingController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getAllPolls:string;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      Year: '',
      selectedDate: new Date(),
      checked: false,
      editorState: EditorState.createEmpty(),

      InitialPollData: { 
        title:'',
        startDate:'', 
        endDate:'', 
        description:'',
        question:'',
        // optionOne:'',
        // optionTwo:'',
      },

      PollData: { 
        title:'',
        startDate:'', 
        endDate:'', 
        description:'',
        question:'',
        // optionOne:'',
        // optionTwo:'',
      },

      options: [ {options1: "" }, {options2: "", } ],


      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.handlePollDataChange = this.handlePollDataChange.bind(this)
    this.handlePollDataSubmit = this.handlePollDataSubmit.bind(this)

    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    this.onGetPolls();
 
    // Customizable Area End
  }
    // Customizable Area Start
    onGetPolls = async () => {
      this.getAllPolls = await this.apiCall({
        contentType: configJSON.exampleApiContentType,
        method: configJSON.httpGetMethod,
        endPoint: configJSON.getAllPolls,
      });
    }
    handlePollDataChange = (event:any) => {
      this.setState({ PollData: {...this.state.PollData, [event.target.name] : event.target.value}})
    }

    handlePollDataSubmit = (event:any) => {
      event.preventDefault()
      console.log("Polls Data ==>", this.state.PollData)
      console.log("Options Data ==>", this.state.options)
        this.setState({PollData: this.state.InitialPollData})
    }

    // add field function

    handleOptionsChange = (index:any, event:any) => {
      const optionsValuse = [...this.state.options];
      optionsValuse[index][event.target.name] = event.target.value;
      this.setState({options: optionsValuse})
    }

    addOptionsFields = () => {
      console.log("clicked---=-=-=-=-=")
      this.setState({options : [...this.state.options, {options1: ""}]})
    }
    
    onChange = (editorState:any) => {
      this.setState({editorState});
    }

    handleDateChange = (date: Date | null) => {
      this.setState({selectedDate:  date});
    };
  
    handleChange = (event: any) => {
      console.log('click', event.target.value)
      //this.setState({year: event.target.value});
    };
  
    // Customizable Area End


  //============================= API CALL BLOCK ==========================================================
  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;
    const token = localStorage.getItem('token')
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




  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
    // Customizable Area Start
    if (responseJson && responseJson.data) {
      if (apiRequestCallId === this.getAllPolls) {
       console.log(responseJson);
       
      }
    }else if (responseJson && responseJson?.error || responseJson?.errors) {
      if (apiRequestCallId === this.getAllPolls) {
        console.log(responseJson);
        
       }
      }
  }
    
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

}
