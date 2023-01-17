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
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import VisitorsSidebar from "../../dashboard/src/VisitorsSidebar.web";

class FaqChairman extends FaqChairmanController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {t} = this.props
    const { classes } = this.props;
    const userType  = localStorage.getItem("selectUserType");

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.faqChairman}>
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              {  userType === "Security" ? 
                            <VisitorsSidebar {...this.props} />
                            :
                            <ChairmanSidebarWeb {...this.props} /> 
                           }
            </Grid>

            <Grid item xs={9} md={9} sm={9} style={{ paddingTop: 35 }}>
              <Container>
                <Box className="navigation">
                  <Box>
                    <Typography variant="body1">
                      {t("Help")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Frequently asked questions")}
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      {t("Frequently asked questions")}
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
                  {
                     userType === "Security"  ? null
                     :
                     <Button
                       startIcon={<AddIcon />}
                       variant="contained"
                       onClick={() => this.handleAddCategoryModal()}
                     >
                       {t("Add New Category")}
                     </Button>
                  }
                 
                </Box>

                {this.state.faqList.length === 0 && (
                  <Box className="empty-box">
                    <img src={QuestionImage} alt="no questions" />
                    <Typography
                      variant="h6"
                      style={{ fontWeight: "600", marginBottom: "15px" }}
                    >
                      {t("No Question Added")}
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
                            {userType === "Security" ? 
                            null
                            :
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
                            }
                            
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>{faq.content}</Typography>
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                </Box>
                <Box className="bottom-buttons">
                  {
                  userType === "Security" ? 
                  null
                  :
                  this.state.selectedCategoryName ? (
                    <Button
                      className="remove-cat-button"
                      variant="outlined"
                      onClick={() => this.handleDeleteAllCategoryModal()}
                    >
                      {t("Remove")} {this.state.selectedCategoryName} {t("Faq")}
                    </Button>
                  ) : (
                    <div />
                  )}
                  {
                     userType === "Security" ? 
                     null
                     :
                     <Button
                     disabled={this.state.catagoriesList.length === 0}
                     variant="contained"
                     onClick={() => this.handleAddQuestionModal()}
                   >
                     {t("Add Questions")}
                   </Button>
                  }
                 
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
              <Typography variant="h6">{t("Add Questions")}</Typography>
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
                    {t("Select Category")}
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
                    {t("Maximum length of title should be 500 character")}
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
                className="cancel-button"
                onClick={() => this.handleAddQuestionModal()}
              >
                {t("Cancel")}
              </Button>
              <Button
                className="add-button"
                onClick={() => this.createFaq()}
                disabled={
                  this.state.createAnswer.length === 0 ||
                  this.state.createQuestion.length === 0 ||
                  this.state.createQuestion.length > 500 ||
                  this.state.createCategoryId.length === 0
                }
              >
                {t("Add")}
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            className="add-faq-dialog"
            onClose={() => this.handleEditQuestionModal()}
            open={this.state.isEditQuestionModalOpen}
          >
            <MuiDialogTitle className="dialog-heading" disableTypography>
              <Typography variant="h6">{t("Edit Questions")}</Typography>
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
                    {t("Select Category")}
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
                    {t("Maximum length of title should be 500 character")}
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
                onClick={() => this.handleEditQuestionModal()}
                className="cancel-button"
              >
                {t("Cancel")}
              </Button>
              <Button
                onClick={() => this.editFaq()}
                disabled={
                  this.state.editAnswer.length === 0 ||
                  this.state.editQuestion.length === 0 ||
                  this.state.editQuestion.length > 500 ||
                  this.state.editCategoryId.length === 0
                }
                className="add-button"
              >
                {t("Edit")}
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            fullWidth
            onClose={() => this.handleAddCategoryModal()}
            open={this.state.isAddCategoryModalOpen}
          >
            <MuiDialogTitle className="dialog-heading" disableTypography>
              <Typography variant="h6">{t("Add Category")}</Typography>
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
                onClick={() => this.handleAddCategoryModal()}
                className="cancel-button"
              >
                {t("Cancel")}
              </Button>
              <Button
                disabled={this.state.categoryName.length === 0}
                onClick={() => {
                  this.createCategory();
                }}
                className="add-button"
              >
                {t("Confirm")}
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
                  {t("Do you want to delete the category?")}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: "0px" }}>
                  {t("Are you sure want to delete the category")}
                  {this.state.selectedCategoryName}"?
                </Typography>
                <Typography variant="body1" style={{ marginBottom: "15px" }}>
                  {t("All FAQ related this category will be deleted permanently.")}
                </Typography>
                <DialogActions className="dialog-button-group">
                  <Button
                    onClick={() => this.handleDeleteAllCategoryModal()}
                    className="cancel-button"
                    style={{ width: "200px" }}
                  >
                    {t("No, Don't Delete")}
                  </Button>
                  <Button
                    onClick={() => {
                      this.deleteCategory();
                    }}
                    style={{ width: "200px" }}
                    className="add-button"
                  >
                    {t("Yes Delete")}
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
                  {t("Do you want to delete the question?")}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: "15px" }}>
                  {t("Are you sure want to delete the question?")}
                </Typography>
                <DialogActions className="dialog-button-group">
                  <Button
                    onClick={() => this.handleDeleteQuestionModal()}
                    className="cancel-button"
                    style={{ width: "200px" }}
                  >
                    {t("No, Don't Delete")}
                  </Button>
                  <Button
                    onClick={() => {
                      this.deleteFaq();
                    }}
                    className="add-button"
                    style={{ width: "200px" }}
                  >
                    {t("Yes Delete")}
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

export default withTranslation()(withStyles(FaqChairmanStyleWeb)(FaqChairman));
// Customizable Area End
