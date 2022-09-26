import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import * as Yup from 'yup';

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
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
  currentTab:any;
  dataSearch: any;
  anchorEl:any;
  anchorEl1:any;
  setUnitOpen:boolean;
  invitationData:any;
  setDelinkOpen:boolean;
  setSuspendOpen:boolean;
  setEditOpen:boolean;
  unitImages:any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class UnitDetailsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
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
      currentTab:"1",
      dataSearch: "",
      anchorEl:null,
      anchorEl1:null,
      setUnitOpen:false,
      invitationData:"",
      setDelinkOpen:false,
      setSuspendOpen:false,
      setEditOpen:false,
      unitImages:[]
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
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

  // Customizable Area Start
//   handleTabChange = (e: any) => {
//     console.log("currentTab=====>>", typeof this.state.currentTab)
//     this.setState({currentTab:e.target.id})
//   };
  
//   handleClose = () => {
//     this.setState({anchorEl:null})
//   }

handleMoreClose = () => {
    this.setState({anchorEl:null});
}

handleMoreClick = (e: any) => {
this.setState({anchorEl:e.currentTarget});
}

handleFamilyMoreClick = (e: any) => {
    this.setState({anchorEl1:e.currentTarget});
}

handleFamilyClose = (e: any) => {
    this.setState({anchorEl1:null});
}

InvitationSchema() {
    const validations = Yup.object().shape({
        complexname: Yup.string().required(`This field is required`),
        buildingname: Yup.string().required(`This field is required`),
        unitno: Yup.string().required(`This field is required`),
        configuration: Yup.string().required(`This field is required`),
        purchaseprice:Yup.string().required(`This field is required`),
        purchasedate:Yup.string().required(`This field is required`),
        currentvaluation:Yup.string().required(`This field is required`),
        size: Yup.string().required(`This field is required`),
    });
    return validations
  }

  EditSchema() {
    const validations = Yup.object().shape({
        countryname: Yup.string().required(`This field is required`),
        buildingname: Yup.string().required(`This field is required`),
        buildingarea: Yup.string().required(`This field is required`),
        totalfloors: Yup.string().required(`This field is required`),
        totalunits:Yup.string().required(`This field is required`),
        purchasedate:Yup.string().required(`This field is required`),
        currentvaluation:Yup.string().required(`This field is required`),
        size: Yup.string().required(`This field is required`),
    });
    return validations
  }

  
invitationData = (values: any) => {
    this.setState({invitationData:values})
}
    
handleUnitClose = () => {
    this.setState({setUnitOpen:false})
}
handleUnitOpen = () => {
    this.setState({setUnitOpen:true});
};

handleDelinkOpen = () => {
    this.setState({setDelinkOpen:true})
}
handleDelinkClose = () => {
    this.setState({setDelinkOpen:false})
}

handleSuspendClose = () => {
    this.setState({setSuspendOpen:false})
}

handleSuspendOpen = () => {
    this.setState({setSuspendOpen:true})
}

handleEditClose = () => {
    this.setState({setEditOpen:false})
}

handleEditOpen = () => {
    this.setState({setEditOpen:true})
}

imageonChange = (imageList: any, addUpdateIndex: any) => {
  // data for submit
  console.log(imageList, addUpdateIndex);
  this.setState({unitImages:imageList})
};

  // Customizable Area End
}
