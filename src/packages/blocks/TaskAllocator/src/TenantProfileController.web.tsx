import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface S {
  profileId: string;
  unitId: string;

  profileData: ProfileData;
}

interface ProfileData {
  image: string;
  name: string;
  gender: string;
  dob: string;
  bio: string;
  phone: string;
  email: string;
  hobbies: any[];
  social: any[];
  isDisableChat: boolean;
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class TenantProfileController extends BlockComponent<Props, S, SS> {
  GetProfileDetailsCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      profileId: "",
      unitId: "",

      profileData: {
        image: "",
        name: "",
        gender: "",
        dob: "",
        bio: "",
        phone: "",
        email: "",
        hobbies: [],
        social: [],
        isDisableChat: false,
      },
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Profile Details - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetProfileDetailsCallId !== null &&
      this.GetProfileDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetProfileDetailsCallId = null;

      let responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      this.getProfileDetailsResponse(responseJson);

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }
  }

  async componentDidMount(): Promise<void> {
    const profile_id = this.props.navigation.getParam("id");
    const unit_id = this.props.navigation.getParam("uId");
    this.setState({ profileId: profile_id, unitId: unit_id }, () => {
      this.getProfileDetails();
    });
  }

  getProfileDetails = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetProfileDetailsCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/account_block/neighobour_profile?account_id=${this.state.profileId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  getProfileDetailsResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      const tenant = responseJson.data;
      this.setState({
        profileData: {
          image: tenant.attributes.profile_pic ? tenant.attributes.profile_pic.url : "",
          name: tenant.attributes.full_name.name,
          gender: tenant.attributes.gender.gender,
          dob: tenant.attributes.date_of_birth.date_of_birth,
          bio: tenant.attributes.bio.bio,
          hobbies: tenant.attributes.hobbies.hobbies ? tenant.attributes.hobbies.hobbies : [],
          isDisableChat: tenant.attributes.disable_chat,
          phone: tenant.attributes.full_phone_number.full_phone_number,
          email: tenant.attributes.email.email,
          social: tenant.attributes.website,
        },
      });
    }
  };

  validationText = (name: any) => {
    if (name) {
      return name;
    }
    return "-";
  };
}
