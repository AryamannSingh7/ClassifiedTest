// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import {
  Button,
  Container,
  IconButton,
  // Link,
  withStyles,
  Box,
  Grid,
  Tab,
  MenuItem,
  Card,
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
  Select,
  OutlinedInput,
  ListItemIcon,
  Input,
  InputAdornment,
} from "@material-ui/core";
import { Menu } from "@szhsin/react-menu";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import ChangedSelectedTemplateController, {
  Props,
} from "./ChangedSelectedTemplateController.web";
import { Link } from "react-router-dom";
import { ContractsStyleWeb } from "./ContractsStyle.web";

import BuildingLogo from "../assets/building.png";
import SortIcon from "../assets/sort.png";
import FilterIcon from "../assets/filter.png";
import CubeIcon from "../assets/cube.png";
import EditIcon from "../assets/edit.png";

class ChangedSelectedTemplate extends ChangedSelectedTemplateController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    console.log();

    return (
      <>
        <Box
          style={{ background: "white", height: "100vh" }}
          className={classes.changedTemplate}
        >
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <IconButton onClick={() => this.goBackPage()}>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    Issue a Lease
                  </div>
                </Box>
                <Container className="page-container">
                  <div className="template-box">
                    <div className="template-view">
                      <br />
                      <br />
                      <br />
                      <br />a
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />a
                      <br />
                      <br />
                      <br />a
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />a
                      <br />
                    </div>
                    <div className="upload-button">
                      <Box className="condition-select">
                        <input type="radio" />
                        <span>Include late payment penalty condition</span>
                      </Box>
                      {/* <Box className="condition-select">
                        <input type="radio" checked={true} />
                        <span>Penalty for la te Payment</span>
                      </Box> */}
                      <Box className="penalty-detail">
                        <div className="header">
                          <h4>Penalty Details</h4>
                          <img src={EditIcon} />
                        </div>
                        <div className="content">
                          <Grid container spacing={2}>
                            <Grid item xs={6} className="content-item">
                              <Box>
                                <img src={EditIcon} />
                              </Box>
                              <Box>
                                <span>Penalty Type</span>
                                <p>Fixed Amount</p>
                              </Box>
                            </Grid>
                            <Grid item xs={6} className="content-item">
                              <Box>
                                <img src={EditIcon} />
                              </Box>
                              <Box>
                                <span>Penalty Amount</span>
                                <p>SR 250</p>
                              </Box>
                            </Grid>
                            <Grid item xs={12} className="content-item">
                              <Box>
                                <img src={EditIcon} />
                              </Box>
                              <Box>
                                <span>How Penalty will be counted?</span>
                                <p>Lorem ipsum..</p>
                              </Box>
                            </Grid>
                          </Grid>
                        </div>
                      </Box>
                      <Box className="button-group">
                        <Button className="condition-button">
                          Add More Condition
                        </Button>
                        <Link to="/IssueContract/1/LeaseForm/Template/Review">
                          <Button>Review A Lease</Button>
                        </Link>
                      </Box>
                    </div>
                  </div>
                </Container>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                className="right-block right-image"
                display={{ xs: "none", md: "flex" }}
              >
                <img src={BuildingLogo} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Dialog
          className="penalty-dialog"
          maxWidth="xs"
          fullWidth
          onClose={() => this.handlePenaltyCountModal()}
          open={this.state.isPenaltyCountModalOpen}
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
                  Select Currency
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
                  Fixed Percentage of Rent
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <Input
                variant="filled"
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
                  Fixed Amount
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <Input
                variant="filled"
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

export default withStyles(ContractsStyleWeb)(ChangedSelectedTemplate);
// Customizable Area End
