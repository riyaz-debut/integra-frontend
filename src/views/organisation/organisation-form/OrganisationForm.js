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
import FileUpload from "components/DropZone/FileUpload";
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
    msp_id: Yup.string()
      .trim()
      .matches(
        RegexTypes.checkSpacialCharacter,
        "MSP ID can not contain special character"
      )
      .max(35, "MSP ID must be no longer than 35 characters")
      .min(3, "MSP ID must be at least 3 character long")
      .required("MSP ID is required"),
    peers_count: Yup.number().required("PEERS COUNT is required"),
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

            if (values.file <= 0) {
              setErrors({ file: "Please Select file" });
              return false;
            }

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
                label="Organisation Name"
                name="name"
                value={values.name || ""}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.name && errors.name ? true : false}
                fullWidth
              />
              <ErrorMessage name="name" component={MDTextError} />
            </MDBox>
            <MDBox mb={2}>
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
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                fullWidth
                type="NUMBER"
                label="PEERS COUNT"
                name="peers_count"
                value={values.peers_count || ""}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.peers_count && errors.peers_count ? true : false}
              />
              <ErrorMessage name="peers_count" component={MDTextError} />
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
              <FileUpload
                name="file"
                fileData={values.file}
                onSelect={setFileData}
                saveImage={setInputValue}
                allFieldValue={values}
                fileValidate={{
                  maxSize: 1,
                  fileExtension: "application/json",
                }}
              />
              <ErrorMessage name="peers_count" component={MDTextError} />
            </MDBox>

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
