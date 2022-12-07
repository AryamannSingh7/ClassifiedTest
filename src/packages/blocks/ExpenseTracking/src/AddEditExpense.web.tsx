import React from "react";

// Customizable Area Start
import {
  Button,
  Container,
  IconButton,
  withStyles,
  Box,
  Grid,
  MenuItem,
  Select,
  OutlinedInput,
  InputAdornment,
  Input,
  FormControl,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  BuildingIcon,
  CategoryIcon,
  ExpenseAmountIcon,
  ExpenseDateIcon,
  IssueIcon,
  ResolvedByIcon,
  SummaryIcon,
  UnitIcon,
} from "./assets";
import AddEditExpenseController, { IBuilding, IExpenseCategory, IUnit, Props } from "./AddEditExpenseController.web";
import { Formik, Form } from "formik";
import { withTranslation } from "react-i18next";
import { ExpenseTrackingStyle } from "./ExpenseTrackingStyle.web";
import Loader from "../../../components/src/Loader.web";
import SidebarImageComponent from "../../../components/src/OwnerSidebarImage.web";
// Customizable Area End

class AddEditExpense extends AddEditExpenseController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    const { t, classes } = this.props;

    console.log(this.state);

    return (
      // Customizable Area Start
      <>
        <Loader loading={this.state.loading} />

        <Box className={classes.addEditExpense}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box>
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <Box className="left-icon">
                    <IconButton onClick={() => this.handleNavigationBack()}>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    {this.state.expenseId ? <span>{t("Edit Expense")}</span> : <span>{t("Add Another Expense")}</span>}
                  </Box>
                </Box>
                <Container className="page-container">
                  <Box className="issue-lease-content form">
                    <Formik
                      enableReinitialize={true}
                      initialValues={this.state.expenseForm}
                      validationSchema={this.validationExpenseFormSchema}
                      onSubmit={(values, { resetForm }) => {
                        this.handleSubmitExpenseForm(values, resetForm);
                      }}
                    >
                      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                        return (
                          <Form onSubmit={handleSubmit} translate="true">
                            <Box className="select-input-box">
                              <FormControl fullWidth>
                                <Input
                                  value={values.expenseDate}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="expenseDate"
                                  className="select-input input"
                                  placeholder={t("Expense Date")}
                                  onFocus={(e: React.ChangeEvent<{ type: string }>) => (e.target.type = "date")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={ExpenseDateIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.expenseDate && touched.expenseDate && (
                                  <p className="error">{t(errors.expenseDate)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.expenseAmount}
                                  name="expenseAmount"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="select-input input"
                                  placeholder={t("Expense Amount")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={ExpenseAmountIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.expenseAmount && touched.expenseAmount && (
                                  <p className="error">{t(errors.expenseAmount)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.issueTitle}
                                  name="issueTitle"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="select-input input"
                                  placeholder={t("Issue Title")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={IssueIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.issueTitle && touched.issueTitle && (
                                  <p className="error">{t(errors.issueTitle)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value={values.category}
                                    name="category"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    variant="filled"
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Category")}
                                    </MenuItem>
                                    {this.state.expenseCategoryList.map((category: IExpenseCategory) => {
                                      return (
                                        <MenuItem value={category.id} key={category.id}>
                                          {category.title}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                  <img src={CategoryIcon} alt="" />
                                </Box>
                                {errors.category && touched.category && <p className="error">{t(errors.category)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value={values.building}
                                    name="building"
                                    onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                                      const buildingId: string = e.target.value as string;
                                      setFieldValue("building", buildingId);
                                      this.getUnitList(buildingId);
                                    }}
                                    onBlur={handleBlur}
                                    variant="filled"
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Building Name")}
                                    </MenuItem>
                                    {this.state.buildingList.map((building: IBuilding) => {
                                      return (
                                        <MenuItem value={building.id} key={building.id}>
                                          {building.name}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                  <img src={BuildingIcon} alt="" />
                                </Box>
                                {errors.building && touched.building && <p className="error">{t(errors.building)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value={values.unit}
                                    name="unit"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    variant="filled"
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Unit Number")}
                                    </MenuItem>
                                    {this.state.unitList.map((unit: IUnit) => {
                                      return (
                                        <MenuItem value={unit.id} key={unit.id}>
                                          {unit.apartment_name}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                  <img src={UnitIcon} alt="" />
                                </Box>
                                {errors.unit && touched.unit && <p className="error">{t(errors.unit)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.resolvedBy}
                                  name="resolvedBy"
                                  className="select-input input"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  placeholder={t("Resolved By")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={ResolvedByIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.resolvedBy && touched.resolvedBy && (
                                  <p className="error">{t(errors.resolvedBy)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.summary}
                                  name="summary"
                                  className="select-input input"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  placeholder={t("Summary of the issue")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={SummaryIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.summary && touched.summary && <p className="error">{t(errors.summary)}</p>}
                              </FormControl>

                              <Box className="next-button">
                                {this.state.expenseId ? (
                                  <Button type="submit">{t("Update Expense")}</Button>
                                ) : (
                                  <Button type="submit">{t("Add Expense")}</Button>
                                )}
                              </Box>
                            </Box>
                          </Form>
                        );
                      }}
                    </Formik>
                  </Box>
                </Container>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <SidebarImageComponent />
            </Grid>
          </Grid>
        </Box>
      </>
      // Customizable Area End
    );
  }
}

export default withTranslation()(withStyles(ExpenseTrackingStyle)(AddEditExpense));
