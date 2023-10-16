import React, { useState } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
// /import clsx from 'clsx';

// import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import useScriptRef from "hooks/useScriptRef";
import MDTextError from "components/MDTextError/";
import FileUpload from "components/DropZone/FileUpload";

import RegexTypes from "regex";

const ChaincodeForm = (props) => {
  const { submitData, formInitialValue, buttonLabel } = props;
  //   const initialValues = formInitialValue;
  const scriptedRef = useScriptRef();
  const [initialValues, setInitialValues] = useState(formInitialValue);

  //  const initialValues = formInitialValue;

  const validation = Yup.object({
    name: Yup.string()
      .trim()
      .matches(RegexTypes.checkSpacialCharacter, "Name can not contain special character")
      .max(35, "Name must be no longer than 35 characters")
      .min(5, "Name must be at least 5 character long")
      .required("Name is required"),
    label: Yup.string()
      .trim()
      .matches(RegexTypes.checkSpacialCharacter, "Label can not contain special character")
      .max(35, "Label must be no longer than 35 characters")
      .min(5, "Label must be at least 5 character long")
      .required("Label is required"),
    version: Yup.string()
      .trim()
      .max(35, "Version must be no longer than 35 characters")
      .min(2, "Version must be at least 2 character long")
      .required("Version is required"),
    url: Yup.string()
      .trim()
      .matches(RegexTypes.UrlRegex, "Enter a valid URL ")
      .required("URL is required"),
    //file:Yup.array().min(1, 'File is required'),  
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
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <MDBox component="div">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
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
                label="Label"
                name="label"
                value={values.label || ""}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.label && errors.label ? true : false}
              />
              <ErrorMessage name="label" component={MDTextError} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                fullWidth
                type="text"
                label="Version"
                name="version"
                value={values.version || ""}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.version && errors.version ? true : false}
              />
              <ErrorMessage name="version" component={MDTextError} />
            </MDBox>

            <MDBox mb={2}>
              <MDInput
                fullWidth
                type="text"
                label="URL"
                name="url"
                value={values.url || ""}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.url && errors.url ? true : false}
              />
              <ErrorMessage name="url" component={MDTextError} />
            </MDBox>

            <MDBox mb={2}>
              <FileUpload
                name="file"
                fileData={values.file}
                onSelect={setFileData}
                saveImage={setInputValue}
                allFieldValue={values}
                fileValidate={{
                  maxSize: 1,
                  fileExtension: 'application/zip',
                }}
              />
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton disableElevation variant="gradient" color="info" type="submit" fullWidth>
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

ChaincodeForm.propTypes = {
  // //For boolean value
  //PropTypes.bool,
  // // While pass children
  //children: PropTypes.node.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  formInitialValue: PropTypes.object,
  submitData: PropTypes.func,
};

export default ChaincodeForm;
