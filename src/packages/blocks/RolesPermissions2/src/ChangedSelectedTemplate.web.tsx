// Customizable Area Start
import React from "react";
import {
  Button,
  Container,
  IconButton,
  withStyles,
  Box,
  Grid,
  MenuItem,
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
  Select,
  OutlinedInput,
  ListItemIcon,
  Input,
  InputAdornment,
  Checkbox,
  Drawer,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import LeaseFormController, { Props } from "./LeaseFormController.web";
import { Link } from "react-router-dom";
import { ContractsStyleWeb } from "./ContractsStyle.web";
import { BuildingLogo, CardIcon, CubeIcon, EditIcon, PenaltyAmountIcon } from "./assets";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";

class ChangedSelectedTemplate extends LeaseFormController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    const template_id: any = this.props.navigation.getParam("templateId");
    this.setState({ ...this.state, templateId: template_id }, () => {
      this.getTemplateText();
    });
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    return (
      <>
        <Box style={{ background: "white", height: "100vh" }} className={classes.changedTemplate}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <IconButton>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    <span>{t("Issue a Lease")}</span>
                  </div>
                </Box>
                <Container className="page-container">
                  <div className="template-box">
                    <div className="template-view">{t("Changed Template")}</div>
                    <div className="upload-button">
                      <Box className="condition-select">
                        <Checkbox value={true} icon={<CircleUnchecked />} checkedIcon={<CircleCheckedFilled />} />
                        <span>{t("Include Penalty for late Payment")}</span>
                      </Box>
                      <Box className="penalty-detail">
                        <div className="header">
                          <h4>{t("Penalty Details")}</h4>
                          <img src={EditIcon} />
                        </div>
                        <div className="content">
                          <Grid container spacing={2}>
                            <Grid item xs={12} className="content-item">
                              <Box>
                                <img src={CardIcon} />
                              </Box>
                              <Box>
                                <span>{t("How Penalty will be counted?")}</span>
                                <p>{t("Fixed Amount")}</p>
                              </Box>
                            </Grid>
                            <Grid item xs={6} className="content-item">
                              <Box>
                                <img src={PenaltyAmountIcon} />
                              </Box>
                              <Box>
                                <span>{t("Penalty Amount")}</span>
                                <p>SR 250</p>
                              </Box>
                            </Grid>
                          </Grid>
                        </div>
                      </Box>
                      <Box className="button-group">
                        <Button className="condition-button" onClick={() => this.handleConditionModal()}>
                          {t("Add More Condition")}
                        </Button>
                        <Link to="/IssueContract/1/LeaseForm/Template/Review">
                          <Button>{t("Review A Lease")}</Button>
                        </Link>
                      </Box>
                    </div>
                  </div>
                </Container>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box className="right-block right-image" display={{ xs: "none", md: "flex" }}>
                <img src={BuildingLogo.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Drawer
          anchor="bottom"
          className="condition-modal"
          open={this.state.isConditionModalOpen}
          onClose={() => this.handleConditionModal()}
        >
          <Box className="condition-box">
            <h2>{t("Add More Conditions")}</h2>
            <Box className="content-box">
              <h4>{t("Personal Condition")}</h4>
              <Box className="condition">
                <p>No Pet Allowed</p>
                <Checkbox
                  className="condition-check"
                  value={true}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              </Box>
              <Box className="condition">
                <p>No Pet Allowed</p>
                <Checkbox
                  className="condition-check"
                  value={true}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              </Box>
            </Box>
            <Box className="content-box">
              <h4>Personal Condition</h4>
              <Box className="condition">
                <p>No Pet Allowed</p>
                <Checkbox
                  className="condition-check"
                  value={true}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              </Box>
              <Box className="condition">
                <p>No Pet Allowed</p>
                <Checkbox
                  className="condition-check"
                  value={true}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              </Box>
              <Box className="condition">
                <p>No Pet Allowed</p>
                <Checkbox
                  className="condition-check"
                  value={true}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              </Box>
              <Box className="condition">
                <p>No Pet Allowed</p>
                <Checkbox
                  className="condition-check"
                  value={true}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              </Box>
              <Box className="condition">
                <p>No Pet Allowed</p>
                <Checkbox
                  className="condition-check"
                  value={true}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              </Box>
              <Box className="condition">
                <p>No Pet Allowed</p>
                <Checkbox
                  className="condition-check"
                  value={true}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              </Box>
              <Box className="condition">
                <p>No Pet Allowed</p>
                <Checkbox
                  className="condition-check"
                  value={true}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              </Box>
            </Box>
          </Box>
          <Box className="button-group">
            <Button className="add-more-button">{t("Copy Checked Condition")}</Button>
            <Button className="add-button">{t("Add Checked Condition to a Lease")}</Button>
          </Box>
        </Drawer>

        <Dialog
          className="penalty-dialog"
          maxWidth="xs"
          fullWidth
          onClose={() => this.handlePenaltyCountModal()}
          open={this.state.isPenaltyCountModalOpen}
        >
          <DialogContent>
            <Box>
              <Typography variant="h6">{t("Penalty for late payments")}</Typography>
              <Select
                displayEmpty
                value=""
                variant="filled"
                fullWidth
                className="select-with-icon"
                input={<OutlinedInput />}
              >
                <MenuItem value="" disabled>
                  <ListItemIcon>
                    <img src={CubeIcon} alt="" />
                  </ListItemIcon>
                  {t("Select Currency")}
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <DialogActions className="dialog-button-group">
                <Button
                  className="add-button"
                  onClick={() => {
                    this.handlePenaltyCountModal();
                  }}
                >
                  {t("Add")}
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog
          className="penalty-dialog"
          maxWidth="xs"
          fullWidth
          onClose={() => this.handlePenaltyRentModal()}
          open={this.state.isPenaltyRentModalOpen}
        >
          <DialogContent>
            <Box>
              <Typography variant="h6">Penalty for late payments</Typography>
              <Select
                displayEmpty
                value=""
                variant="filled"
                fullWidth
                className="select-with-icon"
                input={<OutlinedInput />}
              >
                <MenuItem value="" disabled>
                  <ListItemIcon>
                    <img src={CubeIcon} alt="" />
                  </ListItemIcon>
                  {t("Fixed Percentage of Rent")}
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <Input
                // variant="filled"
                fullWidth
                className="select-input"
                placeholder="Enter Fixed Percentage of Rent"
                startAdornment={
                  <InputAdornment position="start">
                    <img src={CubeIcon} alt="" />
                  </InputAdornment>
                }
              />
              <DialogActions className="dialog-button-group">
                <Button
                  className="add-button"
                  onClick={() => {
                    this.handlePenaltyRentModal();
                  }}
                >
                  Add
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog
          className="penalty-dialog"
          maxWidth="xs"
          fullWidth
          onClose={() => this.handlePenaltyAmountModal()}
          open={this.state.isPenaltyAmountModalOpen}
        >
          <DialogContent>
            <Box>
              <Typography variant="h6">Penalty for late payments</Typography>
              <Select
                displayEmpty
                value=""
                variant="filled"
                fullWidth
                className="select-with-icon"
                input={<OutlinedInput />}
              >
                <MenuItem value="" disabled>
                  <ListItemIcon>
                    <img src={CubeIcon} alt="" />
                  </ListItemIcon>
                  {t("Fixed Amount")}
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <Input
                // variant="filled"
                fullWidth
                className="select-input"
                placeholder="Enter Fixed Amount"
                startAdornment={
                  <InputAdornment position="start">
                    <img src={CubeIcon} alt="" />
                  </InputAdornment>
                }
              />
              <DialogActions className="dialog-button-group">
                <Button
                  className="add-button"
                  onClick={() => {
                    this.handlePenaltyAmountModal();
                  }}
                >
                  Add
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withTranslation()(withStyles(ContractsStyleWeb)(ChangedSelectedTemplate));
// Customizable Area End
