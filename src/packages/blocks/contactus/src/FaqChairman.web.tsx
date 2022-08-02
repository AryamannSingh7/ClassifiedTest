// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import {
  Container,
  Typography,
  Link,
  FormControl,
  Tabs,
  Tab,
  AppBar,
  withStyles,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Grid from "@material-ui/core/Grid";
import FaqChairmanController, { Props } from "./FaqChairmanController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import TabPanel from "../../Polling/src/TabPanel.web";
import { FaqChairmanStyleWeb } from "./FaqChairmanStyle.web";

import CommentImage from "../assets/comment.png";
import QuestionImage from "../assets/question.png";

class FaqChairman extends FaqChairmanController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.faqChairman}>
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <ChairmanSidebarWeb {...this.props} />
            </Grid>

            <Grid xs={9} md={9} sm={9} spacing={4} style={{ paddingTop: 35 }}>
              <Container>
                <Box className="navigation">
                  <Box>
                    <Typography variant="body1">
                      Help /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        Frequently asked questions
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      Frequently asked questions
                    </Typography>
                  </Box>
                </Box>
                <Box className="category-box">
                  <Box className="category">
                    <Tab label="Vehicles" className="active" />
                    <Tab label="Management Fees" />
                    <Tab label="Meetings" />
                    <Tab label="Visitors" />
                    {/* <Tab label="Item Five" />
                    <Tab label="Item Six" />
                    <Tab label="Item Seven" /> */}
                  </Box>
                  <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    onClick={() => this.handleAddCategoryModal()}
                  >
                    Add New Category
                  </Button>
                </Box>
                <Box className="faq-box">
                  <Accordion square>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography
                        expanded={this.state.expanded === "panel1"}
                        onClick={this.handleChange("panel1")}
                      >
                        Collapsible Group Item #1
                      </Typography>
                      <Box className="icons">
                        <DeleteOutlineIcon
                          onClick={() => this.handleDeleteQuestionModal()}
                          color="#FE8335"
                        />
                        <EditIcon
                          onClick={() => this.handleEditQuestionModal()}
                        />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion square>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography
                        expanded={this.state.expanded === "panel2"}
                        onClick={this.handleChange("panel2")}
                      >
                        Collapsible Group Item #1
                      </Typography>
                      <Box className="icons">
                        <DeleteOutlineIcon color="#FE8335" />
                        <EditIcon />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
                {/* <Box className="empty-box">
                  <img src={QuestionImage} alt="no questions" />
                  <Typography
                    variant="h6"
                    style={{ fontWeight: "600", marginBottom: "15px" }}
                  >
                    No Question Added
                  </Typography>
                </Box> */}
                <Box className="bottom-buttons">
                  <Button
                    variant="outlined"
                    onClick={() => this.handleDeleteAllCategoryModal()}
                  >
                    Remove Vehicle Faq
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => this.handleAddQuestionModal()}
                  >
                    Add Questions
                  </Button>
                </Box>
              </Container>
            </Grid>
          </Box>

          <Dialog
            onClose={() => this.handleAddQuestionModal()}
            open={this.state.isAddQuestionModalOpen}
          >
            <DialogTitle onClose={() => this.handleAddQuestionModal()}>
              Add Questions
            </DialogTitle>
            <DialogContent dividers>
              <FormControl fullWidth>
                <select
                  style={{
                    borderRadius: 4,
                    border: "1px solid #ced4da",
                    fontSize: 16,
                    padding: "15px 26px 15px 12px",
                    fontFamily: "GothamMedium",
                    color: "gray",
                  }}
                >
                  <option aria-label="None">Select Category</option>
                  <option>Ten</option>
                  <option>Twenty</option>
                  <option>Thirty</option>
                </select>
              </FormControl>
              <FormControl fullWidth>
                <input
                  placeholder="Title Questions"
                  style={{
                    borderRadius: 4,
                    border: "1px solid #ced4da",
                    fontSize: 16,
                    padding: "15px 26px 15px 12px",
                    marginTop: "26px",
                    fontFamily: "GothamMedium",
                    outline: "none",
                  }}
                />
              </FormControl>
              <FormControl fullWidth>
                <textarea
                  placeholder="Answer"
                  style={{
                    borderRadius: 4,
                    border: "1px solid #ced4da",
                    fontSize: 16,
                    padding: "10px 26px 10px 12px",
                    marginTop: "26px",
                    height: "100px",
                    outline: "none",
                  }}
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                style={{ width: "150px" }}
                variant="outlined"
                onClick={() => this.handleAddQuestionModal()}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                style={{ width: "150px" }}
                variant="contained"
                onClick={() => {}}
                color="primary"
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            onClose={() => this.handleEditQuestionModal()}
            open={this.state.isEditQuestionModalOpen}
          >
            <DialogTitle onClose={() => this.handleEditQuestionModal()}>
              Edit Questions
            </DialogTitle>
            <DialogContent dividers>
              <FormControl fullWidth>
                <select
                  style={{
                    borderRadius: 4,
                    border: "1px solid #ced4da",
                    fontSize: 16,
                    padding: "15px 26px 15px 12px",
                    fontFamily: "GothamMedium",
                    color: "gray",
                  }}
                >
                  <option aria-label="None">Select Category</option>
                  <option>Ten</option>
                  <option>Twenty</option>
                  <option>Thirty</option>
                </select>
              </FormControl>
              <FormControl fullWidth>
                <input
                  placeholder="Title Questions"
                  style={{
                    borderRadius: 4,
                    border: "1px solid #ced4da",
                    fontSize: 16,
                    padding: "15px 26px 15px 12px",
                    marginTop: "26px",
                    fontFamily: "GothamMedium",
                    outline: "none",
                  }}
                />
              </FormControl>
              <FormControl fullWidth>
                <textarea
                  placeholder="Answer"
                  style={{
                    borderRadius: 4,
                    border: "1px solid #ced4da",
                    fontSize: 16,
                    padding: "10px 26px 10px 12px",
                    marginTop: "26px",
                    height: "100px",
                    outline: "none",
                  }}
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                style={{ width: "150px" }}
                variant="outlined"
                onClick={() => this.handleEditQuestionModal()}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                style={{ width: "150px" }}
                variant="contained"
                onClick={() => {}}
                color="primary"
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            fullWidth
            onClose={() => this.handleAddCategoryModal()}
            open={this.state.isAddCategoryModalOpen}
          >
            <DialogTitle onClose={() => this.handleAddCategoryModal()}>
              Add Category
            </DialogTitle>
            <DialogContent dividers>
              <FormControl fullWidth>
                <input
                  placeholder="Category Title"
                  style={{
                    borderRadius: 4,
                    border: "1px solid #ced4da",
                    fontSize: 16,
                    padding: "15px 26px 15px 12px",
                    fontFamily: "GothamMedium",
                    outline: "none",
                  }}
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                style={{ width: "150px" }}
                variant="outlined"
                onClick={() => this.handleAddCategoryModal()}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                style={{ width: "150px" }}
                variant="contained"
                onClick={() => {}}
                color="primary"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            fullWidth
            onClose={() => this.handleDeleteAllCategoryModal()}
            open={this.state.isDeleteAllCategoryModalOpen}
          >
            <DialogContent style={{ margin: "15px 0" }}>
              <Box textAlign="center">
                <img
                  src={CommentImage}
                  alt="comment"
                  style={{ marginBottom: "10px" }}
                />
                <Typography
                  variant="h6"
                  style={{ fontWeight: "600", marginBottom: "15px" }}
                >
                  Do you want to delete the category?
                </Typography>
                <Typography
                  variant="body1"
                  style={{ color: "gray", marginBottom: "0px" }}
                >
                  Are you sure want to delete the category "visitors"?
                </Typography>
                <Typography
                  variant="body1"
                  style={{ color: "gray", marginBottom: "15px" }}
                >
                  All FAQ related this category will be deleted permanently.
                </Typography>
                <DialogActions style={{ justifyContent: "center" }}>
                  <Button
                    style={{ width: "200px" }}
                    variant="outlined"
                    onClick={() => this.handleDeleteAllCategoryModal()}
                    color="primary"
                  >
                    No, Don't Delete
                  </Button>
                  <Button
                    style={{ width: "200px" }}
                    variant="contained"
                    onClick={() => {}}
                    color="primary"
                  >
                    Yes Delete
                  </Button>
                </DialogActions>
              </Box>
            </DialogContent>
          </Dialog>

          <Dialog
            fullWidth
            onClose={() => this.handleDeleteQuestionModal()}
            open={this.state.isDeleteQuestionModalOpen}
          >
            <DialogContent style={{ margin: "15px 0" }}>
              <Box textAlign="center">
                <img
                  src={CommentImage}
                  alt="comment"
                  style={{ marginBottom: "10px" }}
                />
                <Typography
                  variant="h6"
                  style={{ fontWeight: "600", marginBottom: "15px" }}
                >
                  Do you want to delete the question?
                </Typography>
                <Typography
                  variant="body1"
                  style={{ color: "gray", marginBottom: "15px" }}
                >
                  Are you sure want to delete the question?
                </Typography>
                <DialogActions style={{ justifyContent: "center" }}>
                  <Button
                    style={{ width: "200px" }}
                    variant="outlined"
                    onClick={() => this.handleDeleteQuestionModal()}
                    color="primary"
                  >
                    No, Don't Delete
                  </Button>
                  <Button
                    style={{ width: "200px" }}
                    variant="contained"
                    onClick={() => {}}
                    color="primary"
                  >
                    Yes Delete
                  </Button>
                </DialogActions>
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
      </>
    );
  }
}

export default withStyles(FaqChairmanStyleWeb)(FaqChairman);
// Customizable Area End
