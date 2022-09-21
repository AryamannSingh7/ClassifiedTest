// Customizable Area Start
import React from "react";
import { Container, Typography, FormControl, withStyles, Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { FaqChairmanStyleWeb } from "./FaqChairmanStyle.web";
import ContactUsController, { Props } from "./ContactusController.web";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import { Form, Formik } from "formik";

class ContactUsChairman extends ContactUsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t }: any = this.props;
    const { classes } = this.props;

    console.log(this.state);

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.contactUs}>
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
                      {t("Help")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Contact Us")}
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      {t("Contact Us")}
                    </Typography>
                  </Box>
                </Box>
                <Box className="contact-us-form">
                  <Typography variant="body1" style={{ color: "black", marginBottom: "15px" }}>
                    Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a
                    typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before
                    final copy is available.
                  </Typography>

                  <Grid xs={6} style={{ paddingTop: 35 }}>
                    <Formik
                      initialValues={{
                        title: "",
                        category: "",
                        mobile: "",
                        message: "",
                      }}
                      validationSchema={this.contactUsValidation}
                      onSubmit={(values, { resetForm }) => {
                        this.createContactUs(values);
                        resetForm();
                      }}
                    >
                      {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
                        return (
                          <Form onSubmit={handleSubmit} translate>
                            <FormControl fullWidth>
                              <input
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="title"
                                placeholder={t("Title")}
                                className="title-input"
                              />
                              {errors.title && touched.title && <small className="error">{t(errors.title)}</small>}
                            </FormControl>
                            <FormControl fullWidth>
                              <select
                                className="select-input"
                                value={values.category}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="category"
                              >
                                <option value="" disabled>
                                  {t("Select Category")}
                                </option>
                                {this.state.categoryList.map((category: any) => {
                                  return (
                                    <option value={category.id} key={category.id}>
                                      {category.title}
                                    </option>
                                  );
                                })}
                              </select>
                              {errors.category && touched.category && (
                                <small className="error">{t(errors.category)}</small>
                              )}
                            </FormControl>
                            <FormControl fullWidth>
                              <input
                                value={values.mobile}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="mobile"
                                placeholder={t("Mobile Number")}
                                className="title-input"
                              />
                              {errors.mobile && touched.mobile && <small className="error">{t(errors.mobile)}</small>}
                            </FormControl>
                            <FormControl fullWidth>
                              <textarea
                                value={values.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="message"
                                placeholder={t("Message")}
                                className="textarea-input"
                              />
                              {errors.message && touched.message && (
                                <small className="error">{t(errors.message)}</small>
                              )}
                            </FormControl>
                            <Button variant="contained" fullWidth type="submit">
                              {t("Send Message")}
                            </Button>
                          </Form>
                        );
                      }}
                    </Formik>
                  </Grid>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(FaqChairmanStyleWeb)(ContactUsChairman));
// Customizable Area End
