// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import {
  Container,
  Typography,
  FormControl,
  Tab,
  withStyles,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import FaqChairmanController, { Props } from "./FaqChairmanController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
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

            <Grid item xs={9} md={9} sm={9} style={{ paddingTop: 35 }}>
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
                    {this.state.catagoriesList.map((category: any) => {
                      return (
                        <Tab
                          key={category.id}
                          onClick={() => {
                            this.setState({
                              ...this.state,
                              faqList: category.attributes.FAQ,
                              selectedCategoryId: category.id,
                              selectedCategoryName: category.attributes.name,
                            });
                          }}
                          label={category.attributes.name}
                          className={
                            category.id === this.state.selectedCategoryId
                              ? "active"
                              : ""
                          }
                        />
                      );
                    })}
                  </Box>
                  <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    onClick={() => this.handleAddCategoryModal()}
                  >
                    Add New Category
                  </Button>
                </Box>

                {this.state.faqList.length === 0 && (
                  <Box className="empty-box">
                    <img src={QuestionImage} alt="no questions" />
                    <Typography
                      variant="h6"
                      style={{ fontWeight: "600", marginBottom: "15px" }}
                    >
                      No Question Added
                    </Typography>
                  </Box>
                )}
                <Box className="faq-box">
                  {this.state.faqList.length >= 0 &&
                    this.state.faqList.map((faq: any) => {
                      return (
                        <Accordion square key={faq.id}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography
                              expanded={this.state.expanded === faq.title}
                              onClick={this.handleChange(faq.title)}
                            >
                              {faq.title}
                            </Typography>
                            <Box className="icons">
                              <DeleteOutlineIcon
                                onClick={() => {
                                  this.selectDeleteFaq(faq);
                                }}
                              />
                              <EditIcon
                                onClick={() => {
                                  this.selectEditFaq(faq);
                                }}
                              />
                            </Box>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>{faq.content}</Typography>
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                </Box>
                <Box className="bottom-buttons">
                  {this.state.selectedCategoryName ? (
                    <Button
                      disabled={this.state.faqList.length === 0}
                      variant="outlined"
                      onClick={() => this.handleDeleteAllCategoryModal()}
                    >
                      Remove {this.state.selectedCategoryName} Faq
                    </Button>
                  ) : (
                    <div />
                  )}
                  <Button
                    disabled={this.state.catagoriesList.length === 0}
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
                  onChange={(e: any) => {
                    this.setState({
                      ...this.state,
                      createCategoryId: e.target.value,
                    });
                  }}
                  value={this.state.createCategoryId}
                  style={{
                    borderRadius: 4,
                    border: "1px solid #ced4da",
                    fontSize: 16,
                    padding: "15px 26px 15px 12px",
                    fontFamily: "GothamMedium",
                    color: "gray",
                    background: "white",
                  }}
                >
                  <option aria-label="None" value="">
                    Select Category
                  </option>
                  {this.state.catagoriesList.map((category: any) => {
                    return (
                      <option value={category.id}>
                        {category.attributes.name}
                      </option>
                    );
                  })}
                </select>
              </FormControl>
              <FormControl fullWidth>
                <input
                  onChange={(e: any) => {
                    this.setState({
                      ...this.state,
                      createQuestion: e.target.value,
                    });
                  }}
                  value={this.state.createQuestion}
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
                  onChange={(e: any) => {
                    this.setState({
                      ...this.state,
                      createAnswer: e.target.value,
                    });
                  }}
                  value={this.state.createAnswer}
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
                onClick={() => this.createFaq()}
                color="primary"
                disabled={
                  this.state.createAnswer.length === 0 ||
                  this.state.createQuestion.length === 0 ||
                  this.state.createCategoryId.length === 0
                }
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
                  value={this.state.editCategoryId}
                  onChange={(e: any) => {
                    this.setState({
                      ...this.state,
                      editCategoryId: e.target.value,
                    });
                  }}
                  style={{
                    borderRadius: 4,
                    border: "1px solid #ced4da",
                    fontSize: 16,
                    padding: "15px 26px 15px 12px",
                    fontFamily: "GothamMedium",
                    color: "gray",
                    background: "white",
                  }}
                >
                  <option aria-label="None" value="">
                    Select Category
                  </option>
                  {this.state.catagoriesList.map((category: any) => {
                    return (
                      <option value={category.id}>
                        {category.attributes.name}
                      </option>
                    );
                  })}
                </select>
              </FormControl>
              <FormControl fullWidth>
                <input
                  onChange={(e: any) => {
                    this.setState({
                      ...this.state,
                      editQuestion: e.target.value,
                    });
                  }}
                  value={this.state.editQuestion}
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
                  onChange={(e: any) => {
                    this.setState({
                      ...this.state,
                      editAnswer: e.target.value,
                    });
                  }}
                  value={this.state.editAnswer}
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
                onClick={() => this.editFaq()}
                color="primary"
                disabled={
                  this.state.editAnswer.length === 0 ||
                  this.state.editQuestion.length === 0 ||
                  this.state.editCategoryId.length === 0
                }
              >
                Edit
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
                  value={this.state.categoryName}
                  onChange={(e: any) => {
                    this.setState({
                      ...this.state,
                      categoryName: e.target.value,
                    });
                  }}
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
                disabled={this.state.categoryName.length === 0}
                style={{ width: "150px" }}
                variant="contained"
                onClick={() => {
                  this.createCategory();
                  this.handleAddCategoryModal();
                }}
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
                  Are you sure want to delete the category "
                  {this.state.selectedCategoryName}"?
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
                    onClick={() => {
                      this.deleteCategory();
                      this.handleDeleteAllCategoryModal();
                    }}
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
