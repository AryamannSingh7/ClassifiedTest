import React, { PureComponent } from 'react';
import {Backdrop, Box, Fade, Modal, Paper, Typography,IconButton} from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close';
import {SuccessIcon} from "../../blocks/RolesPermissions2/src/assets"

interface OwnProps {
  show:boolean;
  handleClose:any;
  message:string;
}

type Props = OwnProps;

class AlertError extends PureComponent<Props> {

  render() {
    return (
      <>
        <Modal
            style={alertModal.modal}
            open={this.props.show}
            onClose={this.props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}>
          {/*@ts-ignore*/}
          <Fade in={this.props.show}>
            <Paper style={alertModal.paper}>
              {/*@ts-ignore*/}
              <Box style={alertModal.cancel} onClick={this.props.handleClose}>
                  <CloseIcon style={{fontSize:"30px"}}/>
              </Box>
              <Box style={{width:"100%",display:'flex',alignItems:'center',justifyContent:'center'}}>
                <img src={SuccessIcon} height="50px" style={{marginTop:"-10px"}}/>
              </Box>
              <Box style={{textAlign:"center",marginTop:"20px",marginBottom:"20px"}}>
                  <Typography>
                    {this.props.message}
                  </Typography>
              </Box>
            </Paper>
          </Fade>
        </Modal>
      </>
    );
  }
}

export default AlertError;

const alertModal = {
  cancel:{
    top:15,
    right:15,
    float:"right",
    cursor:"pointer"
  },
  modal:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "#fff",
    borderRadius: '10px',
    padding: "15px 15px 15px",
    width:"275px"
  },
};
