import React, { useState } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, Form, getIn, ErrorMessage, FieldArray } from "formik";
// /import clsx from 'clsx';

import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import useScriptRef from "hooks/useScriptRef";
import MDTextError from "components/MDTextError/";
import MDTypography from "components/MDTypography";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import RegexTypes from "regex";

const cursorPointer = { cursor: "pointer" };

const OrganisationForm = (props) => {
  const { submitData, formInitialValue, buttonLabel } = props;
  const [initialValues, setInitialValues] = useState(formInitialValue);
  const scriptedRef = useScriptRef();

  //  const initialValues = formInitialValue;
  const validation = Yup.object({
    name: Yup.string()
      .trim()
      .matches(
        RegexTypes.checkSpacialCharacter,
        "Name can not contain special character"
      )
      .max(35, "Name must be no longer than 35 characters")
      .min(3, "Name must be at least 3 character long")
      .required("Name is required"),
    // msp_id: Yup.string()
    //   .trim()
    //   .matches(
    //     RegexTypes.checkSpacialCharacter,
    //     "MSP ID can not contain special character"
    //   )
    //   .max(35, "MSP ID must be no longer than 35 characters")
    //   .min(3, "MSP ID must be at least 3 character long")
    //   .required("MSP ID is required"),
    // peers_count: Yup.number()
    //   .integer()
    //   .typeError("Please enter only numeric value")
    //   .required("Peer count is required"),
    peers: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .max(35, "Name must be no longer than 35 characters")
          .min(5, "Name must be at least 5 character long")
          .required("Name is required"),
        ip: Yup.string()
          .matches(RegexTypes.ipAddressRegex, "Enter a valid IP address")
          .required("IP address is required"),
        certificate: Yup.string().required("Certificate is required"),
      })
    ),
    OrgId: Yup.number().required("Organization id is required"),
  });

  const setFileData = (allFieldValue, data) => {
    // setFormValue({ ...allFieldValue, deleteImages: data.deleteImages, file: data.files });
  };

  const setInputValue = (allFieldValue, key, value) => {
    if (typeof value === "object" || value === "") {
      setInitialValues({ ...allFieldValue, [key]: value });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      enableReinitialize={true}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          if (scriptedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
            console.log(values, "values");

            // if (values.file <= 0) {
            //   setErrors({ file: "Please Select file" });
            //   return false;
            // }

            submitData(values);
          }
        } catch (error) {
          console.error(error);
          if (scriptedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: error.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        setFieldValue,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <MDBox component="div">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Organization Name"
                name="name"
                value={values.name || ""}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.name && errors.name ? true : false}
                fullWidth
              />
              <ErrorMessage name="name" component={MDTextError} />
            </MDBox>
            {/* <MDBox mb={2}>
              <MDInput
                fullWidth
                type="text"
                label="MSP ID"
                name="msp_id"
                value={values.msp_id || ""}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.msp_id && errors.msp_id ? true : false}
              />
              <ErrorMessage name="msp_id" component={MDTextError} />
            </MDBox> */}
            <MDBox mb={2}>
              <MDInput
                fullWidth
                type="text"
                label="Organization Id"
                name="OrgId"
                value={values.OrgId || ""}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.OrgId && errors.OrgId ? true : false}
              />
              <ErrorMessage name="OrgId" component={MDTextError} />
            </MDBox>
            <MDBox mb={2}>
              {/* <MDInput
                fullWidth
                type="text"
                label="Peers Count"
                name="peers_count"
                value={values.peers_count || ""}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.peers_count && errors.peers_count ? true : false}
              /> */}
              <ErrorMessage name="peers_count" component={MDTextError} />
            </MDBox>
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <MDTypography variant="h6" sx={{ pb: 2, mt: 2 }}>
                  Add Peer
                </MDTypography>
              </Grid>
            </Grid>

            <FieldArray name="peers">
              {(fieldArrayProps) => {
                const { push, pop, remove, form } = fieldArrayProps;
                const { values, errors } = form;
                const { peers } = values;

                return (
                  <React.Fragment>
                    {peers.map((peer, index) => (
                      <Grid container spacing={2} key={index}>
                        <Grid item xs={12}>
                          <MDBox borderRadius="lg">
                            <Grid container>
                              <Grid item xs={6} sm={6} md={6}>
                                <MDTypography variant="h6" sx={{ pb: 2 }}>
                                  peer {index + 1}
                                </MDTypography>
                              </Grid>
                              <Grid
                                item
                                xs={6}
                                sm={6}
                                md={6}
                                style={{ textAlign: "end" }}
                              >
                                <MDTypography variant="h6" color="white">
                                  {index >= 1 && (
                                    <DoDisturbOnIcon
                                      color="info"
                                      fontSize="medium"
                                      style={cursorPointer}
                                      onClick={() => {
                                        //  peers.splice(index, 1);
                                        //   console.log(" ++++++++++++++++ ", peers)
                                        //   setFieldValue('peers', peers)

                                        remove(index);
                                      }}
                                    />
                                  )}
                                </MDTypography>
                              </Grid>
                            </Grid>
                          </MDBox>
                        </Grid>

                        <Grid item xs={6} sm={6} md={6}>
                          <MDBox mb={2}>
                            <MDInput
                              type="text"
                              label="Name"
                              value={peer.name}
                              name={`peers.${index}.name`}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                getIn(form.touched, `peers.${index}.name`) &&
                                getIn(errors, `peers.${index}.name`)
                                  ? true
                                  : false
                              }
                              fullWidth
                            />
                            <ErrorMessage
                              name={`peers.${index}.name`}
                              component={MDTextError}
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                          <MDBox mb={2}>
                            <MDInput
                              type="text"
                              label="URL"
                              value={peer.url}
                              name={`peers.${index}.url`}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                getIn(form.touched, `peers.${index}.url`) &&
                                getIn(errors, `peers.${index}.url`)
                                  ? true
                                  : false
                              }
                              fullWidth
                            />
                            <ErrorMessage
                              name={`peers.${index}.url`}
                              component={MDTextError}
                            />
                          </MDBox>
                        </Grid>

                        <Grid item xs={6} sm={6} md={6}>
                          <MDBox mb={2}>
                            <MDInput
                              type="text"
                              label="IP Address"
                              value={peer.ip}
                              name={`peers.${index}.ip`}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                getIn(form.touched, `peers.${index}.ip`) &&
                                getIn(errors, `peers.${index}.ip`)
                                  ? true
                                  : false
                              }
                              fullWidth
                            />
                            <ErrorMessage
                              name={`peers.${index}.ip`}
                              component={MDTextError}
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                          <MDBox mb={2}>
                            <MDInput
                              type="text"
                              label="Certificate"
                              value={peer.certificate}
                              name={`peers.${index}.certificate`}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                getIn(
                                  form.touched,
                                  `peers.${index}.certificate`
                                ) && getIn(errors, `peers.${index}.certificate`)
                                  ? true
                                  : false
                              }
                              fullWidth
                            />
                            <ErrorMessage
                              name={`peers.${index}.certificate`}
                              component={MDTextError}
                            />
                          </MDBox>
                        </Grid>
                      </Grid>
                    ))}

                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      style={{ textAlign: "end" }}
                    >
                      <AddCircleIcon
                        color="info"
                        fontSize="medium"
                        style={cursorPointer}
                        onClick={() =>
                          push({
                            name: "",
                            url: "",
                            ip: "",
                            certificate: "",
                          })
                        }
                      />
                    </Grid>
                  </React.Fragment>
                );
              }}
            </FieldArray>

            <MDBox mt={4} mb={1}>
              <MDButton
                disableElevation
                variant="gradient"
                color="info"
                type="submit"
                fullWidth
              >
                {/* Add Organisation  */}
                {buttonLabel}
              </MDButton>
            </MDBox>
          </MDBox>
        </Form>
      )}
    </Formik>
  );
};

OrganisationForm.propTypes = {
  // //For boolean value
  //PropTypes.bool,
  // // While pass children
  //children: PropTypes.node.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  formInitialValue: PropTypes.object,
  submitData: PropTypes.func,
};

export default OrganisationForm;
