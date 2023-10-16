import React, { useState } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
// /import clsx from 'clsx';

import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import useScriptRef from "hooks/useScriptRef";
import MDTextError from "components/MDTextError/";
import MDSelectOption from "components/MDSelectOption";

import RegexTypes from "regex";
import { generatePassword } from "helpers/GenrateRandomPassword";

const AddNewUserForm = (props) => {
  const { submitData, formInitialValue, buttonLabel, orgList = [] } = props;

  //   const initialValues = formInitialValue;
  const scriptedRef = useScriptRef();
  const [initialValues, setInitialValues] = useState(formInitialValue);

  //  const initialValues = formInitialValue;

  const validation = Yup.object({
    username: Yup.string()
      .trim()
      .matches(
        RegexTypes.checkSpacialCharacter,
        "Name can not contain special character"
      )
      .max(35, "Name must be no longer than 35 characters")
      .min(3, "Name must be at least 5 character long")
      .required("Name is required"),
    org_name: Yup.string().required("Name is required"),
    password: Yup.string()
      .trim()
      .min(6, "Password must be at least 6 character long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    //file:Yup.array().min(1, 'File is required'),
  });

  const handleSelect = (event, setFieldValue) => {
    const id = event.target.value;
    const selectedOrg = orgList.filter((org) => org.Id === Number(id));
    setFieldValue("org_id", selectedOrg[0].Id);
    setFieldValue("org_name", selectedOrg[0].name);
    setFieldValue("org_msp", selectedOrg[0].msp_id);
  };

  const genratePassword = (setFieldValue) => {
    const password = generatePassword();
    setFieldValue("password", password);
    setFieldValue("confirmPassword", password);
  };

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validation}
      enableReinitialize={true}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          if (scriptedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
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
        setFieldValue,
        isSubmitting,
        touched,
        values,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <MDBox component="div">
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6}>
                <MDBox mb={2}>
                  <MDSelectOption
                    control="select"
                    fullWidth
                    label="organization"
                    name="org_name"
                    select
                    SelectProps={{ native: true }}
                    value={values.org_id || ""}
                    variant="outlined"
                    onChange={(event) => handleSelect(event, setFieldValue)}
                    options={orgList}
                  />
                  <ErrorMessage name="org_name" component={MDTextError} />
                </MDBox>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="Name"
                    name="username"
                    value={values.username || ""}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.username && errors.username ? true : false}
                    fullWidth
                  />
                  <ErrorMessage name="username" component={MDTextError} />
                </MDBox>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <MDBox mb={2}>
                  <MDInput
                    fullWidth
                    type="password"
                    label="password"
                    name="password"
                    value={values.password || ""}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.password && errors.password ? true : false}
                  />
                  <ErrorMessage name="password" component={MDTextError} />
                </MDBox>
                <MDButton
                  disableElevation
                  variant="gradient"
                  color="info"
                  type="button"
                  //   fullWidth
                  onClick={() => genratePassword(setFieldValue)}
                >
                  Genrate Password
                </MDButton>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <MDBox mb={2}>
                  <MDInput
                    fullWidth
                    type="password"
                    label="confirm password"
                    name="confirmPassword"
                    value={values.confirmPassword || ""}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={
                      touched.confirmPassword && errors.confirmPassword
                        ? true
                        : false
                    }
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component={MDTextError}
                  />
                </MDBox>
              </Grid>
              {/* <Grid item xs={6} sm={6} md={6}></Grid> */}

              <MDBox width={"100%"} mt={4} mb={1} ml={2} textAlign={"end"}>
                <MDButton
                  disableElevation
                  variant="gradient"
                  color="info"
                  type="submit"
                  //   fullWidth
                >
                  {buttonLabel}
                </MDButton>
              </MDBox>
            </Grid>
          </MDBox>
        </Form>
      )}
    </Formik>
  );
};

AddNewUserForm.propTypes = {
  // //For boolean value
  //PropTypes.bool,
  // // While pass children
  //children: PropTypes.node.isRequired,
  //   buttonLabel: PropTypes.string.isRequired,
  //   formInitialValue: PropTypes.object,
  //   submitData: PropTypes.func,
};

export default AddNewUserForm;
