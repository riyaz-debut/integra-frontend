import React, { useState } from "react";
import { connect } from "react-redux";
//Formik
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import useScriptRef from "hooks/useScriptRef";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";

// import RegexTypes from "regex";
import MDTextError from "components/MDTextError/";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDSelectOption from "components/MDSelectOption";
import MDButton from "components/MDButton";

import { installChainCode } from "store/actions/chain-code";

const CheckUpdateForm = (props) => {
  const { updateList, onInstallChainCode } = props;
  const scriptedRef = useScriptRef();
  const [formValue, setFormValue] = useState({
    chaincode: "",
  });

  //  const initialValues = formInitialValue;
  const validation = Yup.object({
    chaincode: Yup.number().required("Name is required"),
  });

  console.log(" ------------------------------ ", updateList);

  return (
    <React.Fragment>
      <Formik
        initialValues={formValue}
        validationSchema={validation}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
              console.log(" =------------------------- ", values);
              onInstallChainCode(values);
              //onloginRequest(values);
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
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <Grid container spacing={2} sx={{ alignItems: "center" }}>
                <Grid item xs={4}>
                  <MDTypography
                    id="transition-modal-title"
                    variant="h6"
                    component="h6"
                    align="center"
                  >
                    Chaincode:
                  </MDTypography>
                </Grid>
                <Grid item xs={8}>
                  <MDSelectOption
                    control="select"
                    fullWidth
                    label="chaincode"
                    name="chaincode"
                    select
                    SelectProps={{ native: true }}
                    value={values.chaincode || ""}
                    variant="outlined"
                    onChange={handleChange}
                    options={updateList}
                    message={"No new update"}
                  />
                  <ErrorMessage name="chaincode" component={MDTextError} />
                </Grid>
              </Grid>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                disableElevation
                variant="gradient"
                color="info"
                type="submit"
                fullWidth
              >
                Install
              </MDButton>
            </MDBox>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    updateList: state.chainCode.updateList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onCheckUpdate: (data) => {
    //   dispatch(checkUpdate(data));
    // },

    onInstallChainCode: (data) => {
      dispatch(installChainCode(data));
    },
  };
};

CheckUpdateForm.propTypes = {
  onCheckUpdate: PropTypes.func,
  onInstallChainCode: PropTypes.func,
  updateList: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckUpdateForm);
