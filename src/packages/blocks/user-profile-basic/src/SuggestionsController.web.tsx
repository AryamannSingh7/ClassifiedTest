import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
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
  suggestionList:any
  loading:boolean
  error: string | null;
  reposne:any
  // Customizable Area End
}

interface SS {
  id: any;
  
}
  // Customizable Area Start
 
export default class SuggestionsController extends BlockComponent<Props, S, SS> {
  getSuggestionListingApiCallId: any;
  createSuggestionApiCall:any;
  updateSuggestionApiCall:any

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
     // Customizable Area End
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {loading:false,suggestionList:[],error:null,reposne:''};
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      

      if (apiRequestCallId && responseJson) {
        
    
        if (apiRequestCallId === this.getSuggestionListingApiCallId) {
          this.getSuggestionListData(responseJson)
         
        }
        else if (apiRequestCallId === this.createSuggestionApiCall) {
        this.getResponseData(responseJson)
          
   
          }
        //  else if (apiRequestCallId === this.createSuggestionApiCall) {
        //   this.createSuggestionHandle(responseJson)
          
   
        //  }
    }

   

  
    // Customizable Area End
  }
}

  // Customizable Area Start
  getSuggestionListData(responseJson:any){
    if (responseJson?.data ) {
      console.log("getIncidentListingApiCallId ========================>",responseJson)
      this.setState({suggestionList :responseJson?.data})
      this.setState({loading: false})
      } else if (responseJson?.errors) {
        let error = Object.values(responseJson.errors[0])[0] as string;
        this.setState({ error });
      } else {
        this.setState({ error: responseJson?.error || "Something went wrong!" });
      }
      this.parseApiCatchErrorResponse(this.state.error);
      this.setState({loading: false , error:null})
  }
  getResponseData(responseJson:any){
    if (responseJson?.data ) {
      console.log("getIncidentListingApiCallId ========================>",responseJson)
      // this.setState({suggestionList :responseJson?.data})
      this.setState({loading: false})
      // @ts-ignore
      this.props.history.push('/Suggestions')
      } else if (responseJson?.errors) {
        let error = Object.values(responseJson.errors[0])[0] as string;
        this.setState({ error });
      } else {
        this.setState({ error: responseJson?.error || "Something went wrong!" });
      }
      this.parseApiCatchErrorResponse(this.state.error);
      this.setState({loading: false , error:null})
  }
  getSuggtionListing= ()  => {
 
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getSuggestionListingApiCallId = requestMessage.messageId;
      this.setState({ loading: true });

     const  getSortByOrStatus = `bx_block_suggestion/suggestions?society_id=${localStorage.getItem('society_id')}&chairman=true`

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        getSortByOrStatus
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.validationApiMethodType
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  openSuggestion(item:any){
    console.log(this.props)
    localStorage.setItem('selectSuggestion',JSON.stringify(item))
    // @ts-ignore
    this.props.history.push('/SuggestionDetails')
      }
      addResponse=(item:any)=>{
     
        try {
          const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
          );
          const httpBody={
            "description": this.state.reposne,
            "suggestion_id":item?.id
    
          }
          this.createSuggestionApiCall = requestMessage.messageId;
    
          requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            `bx_block_suggestion/suggestion_responses`
          );
    
          const header = {
            token: localStorage.getItem("userToken"),
            "content-type":'application/json'
          };
    
          requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
          );
          requestMessage.addData(
            getName(MessageEnum.RestAPIRequestBodyMessage),
            JSON.stringify(httpBody)
          );
    
    
          requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            'POST'
          );
    
          runEngine.sendMessage(requestMessage.id, requestMessage);
    
          return true;
        } catch (error) {
          console.log(error);
        }
    
      }
      searchSuggestion=(value:any)=>{
        try {
          const header = {
            "Content-Type": configJSON.validationApiContentType,
            token :localStorage.getItem("userToken")
          };
    
          const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
          );
          this.getSuggestionListingApiCallId = requestMessage.messageId;
          this.setState({ loading: true });
    
         const  getSortByOrStatus = `bx_block_suggestion/suggestions?search_term=${value}&society_id=${localStorage.getItem('society_id')}&chairman=true`
    
          requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            getSortByOrStatus
          );
    
          requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
          );
    
          requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.validationApiMethodType
          );
    
          runEngine.sendMessage(requestMessage.id, requestMessage);
          return true;
        } catch (error) {
          console.log(error);
        }
      }
  // Customizable Area End
}
