// Customizable Area Start
import React from "react";
import {
  Container,
  Typography,
  withStyles,
  Box,
  Grid,
  Card,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import {withRouter} from "react-router-dom"
import AnnouncementDetailsController, { Props } from "./AnnouncementDetailsController";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { SuggestionStyleWeb } from "./SuggestionStyle.web";
import { avatarIcon, calenderIcon, CheckIcon, phone, poolImage } from "./assets";
import moment from "moment";
import {withTranslation} from "react-i18next";
import InfoIcon from "@material-ui/icons/Info";

class AnnouncementDetails extends AnnouncementDetailsController {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    //@ts-ignore
    const {t} = this.props
    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.suggestionDetails}>
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <ChairmanSidebarWeb {...this.props} />
            </Grid>

            <Grid item xs={9} md={9} sm={9} style={{ paddingTop: 35 }}>
              <Container>
                <Box className="navigation">
                  <Box>
                    <Typography variant="body1">
                      {t("Community Management")} /
                      <Box component="span" onClick={()=> this.props.history.push("/Announcements")} style={{cursor:"pointer"}}>{t("Announcements")} / </Box>{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Announcement Details")}
                      </Box>
                    </Typography>
                  </Box>
                  <Box className="sub-heading">
                    <h3 className="bold-text ">{t("Announcement Details")}</h3>
                    <Button onClick={() => this.handleWithdrawModal()}>{t("withdraw Announcement")}</Button>
                  </Box>
                </Box>
                <Box className="content-box">
                  <Box className="suggestion-detail">
                    <Card>
                      <Box className="heading">
                        <p>
                          <span className="bold-text">{this.state.AnnouncementDetails?.title}</span>
                        </p>
                        <span className="blue-span" style={{fontSize:"12px"}}>{this.state.AnnouncementDetails?.announcement_category}</span>
                      </Box>
                      {
                        this.state?.AnnouncementDetails?.image?.url &&
                          <img src={this.state?.AnnouncementDetails?.image?.url} />
                      }
                      <Box className="infoIcon">
                        <Typography variant="subtitle1">{t("Description")}</Typography>
                        <InfoIcon style={{color:"grey", fontSize:18}}/>
                      </Box>
                      <p style={{fontSize:"16px"}}>
                        {this.state.AnnouncementDetails?.description}
                      </p>
                      <Box className="suggestion-info">
                        <Box className="info">
                          <img src={avatarIcon} width="25px" />
                          <Box>
                            <p className="heading" style={{fontSize:"14px"}}>{t("Announced By")}:</p>
                            <p style={{fontSize:"16px"}}>{this.state.AnnouncementDetails?.announcement_by}</p>
                          </Box>
                        </Box>
                        <Box className="info">
                          <img src={calenderIcon} width="20px" />
                          <Box>
                            <p className="heading" style={{fontSize:"14px"}}>{t("Announced On")}:</p>
                            <p style={{fontSize:"16px"}}>{moment(this.state.AnnouncementDetails?.announcement_on,'DD/MM/YYYY').format("MMMM DD,YYYY")}</p>
                          </Box>
                        </Box>
                      </Box>
                    </Card>
                  </Box>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>

        <Dialog
          fullWidth
          onClose={() => this.handleWithdrawModal()}
          open={this.state.isWithdrawAnnouncementModalOpen}
          className="cancel-meeting-dialog"
        >
          <DialogContent style={{ margin: "15px 0" }}>
            <Box textAlign="center">
              <img className="comment-image" src={CheckIcon} alt="check" />
              <Typography className="bold-text" variant="h6" style={{fontSize:"22px"}}>{t("Withdraw Announcement")}</Typography>
              <Typography variant="body1" style={{ marginBottom: "0px",color:"#181d25",fontSize:"16px" }}>
                {t("Announcement_Withdraw_Caution")}
              </Typography>
              <DialogActions className="dialog-button-group" style={{marginTop:"15px"}}>
                <Button className="cancel-button" style={{ width: "200px",fontSize:"16px",height:"55px",marginRight:"10px" }} onClick={() => this.handleWithdrawModal()}>
                  {t("Close")}
                </Button>
                <Button style={{ width: "200px",fontSize:"16px",height:"55px" }} className="add-button" onClick={this.handleWithdraw}>
                  {t("Confirm")}
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withTranslation()(withStyles(SuggestionStyleWeb)(withRouter(AnnouncementDetails)));
// Customizable Area End
