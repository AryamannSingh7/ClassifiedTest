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
  DialogContent,
  DialogActions,
  IconButton,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
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
import "./DialogStyle.web.css";

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
                            this.setState(
                              {
                                ...this.state,
                                faqList: category.attributes.FAQ,
                                selectedCategoryId: category.id,
                                createCategoryId: category.id,
                                selectedCategoryName: category.attributes.name,
                              },
                              () => {
                                this.getCategoryByCategoryId();
                              }
                            );
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
                      className="remove-cat-button"
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
            className="add-faq-dialog"
            onClose={() => this.handleAddQuestionModal()}
            open={this.state.isAddQuestionModalOpen}
          >
            <MuiDialogTitle disableTypography className="dialog-heading">
              <Typography variant="h6">Add Questions</Typography>
              <IconButton onClick={() => this.handleAddQuestionModal()}>
                <CloseIcon />
              </IconButton>
            </MuiDialogTitle>
            <DialogContent dividers>
              <FormControl fullWidth>
                <select
                  className="dialog-select-input"
                  onChange={(e: any) => {
                    this.setState({
                      ...this.state,
                      createCategoryId: e.target.value,
                    });
                  }}
                  value={this.state.createCategoryId}
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
                  className="dialog-input"
                />
                {this.state.createQuestion.length > 500 && (
                  <span className="error">
                    Maximum length of title should be 500 character
                  </span>
                )}
              </FormControl>
              <FormControl fullWidth>
                <textarea
                  className="dialog-textarea-input"
                  onChange={(e: any) => {
                    this.setState({
                      ...this.state,
                      createAnswer: e.target.value,
                    });
                  }}
                  value={this.state.createAnswer}
                  placeholder="Answer"
                />
              </FormControl>
            </DialogContent>
            <DialogActions className="dialog-button-group">
              <Button
                variant="outlined"
                onClick={() => this.handleAddQuestionModal()}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => this.createFaq()}
                color="primary"
                disabled={
                  this.state.createAnswer.length === 0 ||
                  this.state.createQuestion.length === 0 ||
                  this.state.createQuestion.length > 500 ||
                  this.state.createCategoryId.length === 0
                }
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            className="add-faq-dialog"
            onClose={() => this.handleEditQuestionModal()}
            open={this.state.isEditQuestionModalOpen}
          >
            <MuiDialogTitle className="dialog-heading" disableTypography>
              <Typography variant="h6">Edit Questions</Typography>
              <IconButton onClick={() => this.handleEditQuestionModal()}>
                <CloseIcon />
              </IconButton>
            </MuiDialogTitle>
            <DialogContent dividers>
              <FormControl fullWidth>
                <select
                  className="dialog-select-input"
                  value={this.state.editCategoryId}
                  onChange={(e: any) => {
                    this.setState({
                      ...this.state,
                      editCategoryId: e.target.value,
                    });
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
                  className="dialog-input"
                  onChange={(e: any) => {
                    this.setState({
                      ...this.state,
                      editQuestion: e.target.value,
                    });
                  }}
                  value={this.state.editQuestion}
                  placeholder="Title Questions"
                />
                {this.state.editQuestion.length > 500 && (
                  <span className="error">
                    Maximum length of title should be 500 character
                  </span>
                )}
              </FormControl>
              <FormControl fullWidth>
                <textarea
                  className="dialog-textarea-input"
                  onChange={(e: any) => {
                    this.setState({
                      ...this.state,
                      editAnswer: e.target.value,
                    });
                  }}
                  value={this.state.editAnswer}
                  placeholder="Answer"
                />
              </FormControl>
            </DialogContent>
            <DialogActions className="dialog-button-group">
              <Button
                variant="outlined"
                onClick={() => this.handleEditQuestionModal()}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => this.editFaq()}
                color="primary"
                disabled={
                  this.state.editAnswer.length === 0 ||
                  this.state.editQuestion.length === 0 ||
                  this.state.editQuestion.length > 500 ||
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
            <MuiDialogTitle className="dialog-heading" disableTypography>
              <Typography variant="h6">Add Category</Typography>
              <IconButton onClick={() => this.handleAddCategoryModal()}>
                <CloseIcon />
              </IconButton>
            </MuiDialogTitle>
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
                  className="dialog-input"
                />
              </FormControl>
            </DialogContent>
            <DialogActions className="dialog-button-group">
              <Button
                variant="outlined"
                onClick={() => this.handleAddCategoryModal()}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                disabled={this.state.categoryName.length === 0}
                variant="contained"
                onClick={() => {
                  this.createCategory();
                }}
                color="primary"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            className="delete-dialog"
            fullWidth
            onClose={() => this.handleDeleteAllCategoryModal()}
            open={this.state.isDeleteAllCategoryModalOpen}
          >
            <DialogContent style={{ margin: "15px 0" }}>
              <Box textAlign="center">
                <img
                  className="comment-image"
                  src={CommentImage}
                  alt="comment"
                />
                <Typography variant="h6">
                  Do you want to delete the category?
                </Typography>
                <Typography variant="body1" style={{ marginBottom: "0px" }}>
                  Are you sure want to delete the category "
                  {this.state.selectedCategoryName}"?
                </Typography>
                <Typography variant="body1" style={{ marginBottom: "15px" }}>
                  All FAQ related this category will be deleted permanently.
                </Typography>
                <DialogActions className="dialog-button-group">
                  <Button
                    variant="outlined"
                    onClick={() => this.handleDeleteAllCategoryModal()}
                    color="primary"
                  >
                    No, Don't Delete
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      this.deleteCategory();
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
            className="delete-dialog"
            fullWidth
            onClose={() => this.handleDeleteQuestionModal()}
            open={this.state.isDeleteQuestionModalOpen}
          >
            <DialogContent style={{ margin: "15px 0" }}>
              <Box textAlign="center">
                <img
                  className="comment-image"
                  src={CommentImage}
                  alt="comment"
                />
                <Typography variant="h6">
                  Do you want to delete the question?
                </Typography>
                <Typography variant="body1" style={{ marginBottom: "15px" }}>
                  Are you sure want to delete the question?
                </Typography>
                <DialogActions className="dialog-button-group">
                  <Button
                    variant="outlined"
                    onClick={() => this.handleDeleteQuestionModal()}
                    color="primary"
                  >
                    No, Don't Delete
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      this.deleteFaq();
                    }}
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
