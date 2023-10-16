import { useState, useEffect } from "react";

// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import { connect } from "react-redux";
import {useNavigate} from 'react-router-dom';

// import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

//Formik
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import useScriptRef from "hooks/useScriptRef";
// import RegexTypes from "regex";
import MDTextError from "components/MDTextError/";
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

//Action
import { loginRequest } from 'store/actions/user'

function Basic(props) {
  const { onloginRequest, isLoginSuccess } = props
  const navigate = useNavigate();
  // const [rememberMe, setRememberMe] = useState(false);
  // const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const scriptedRef = useScriptRef();
  const [formValue, setFormValue] = useState({
    user_name: "user1@org1",
    password: "Welcome01",
  });

  //  const initialValues = formInitialValue;
  const validation = Yup.object({
    user_name: Yup.string()
      .trim()
      .max(35, "Name must be no longer than 35 characters")
      .min(3, "Name must be at least 3 character long")
      .required("Name is required"),
    password: Yup.string()
      .trim()
      // .matches(
      //   RegexTypes.passwordRegex,
      //   "Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      // )
      .max(35, "Password  must be no longer than 35 characters")
      .min(8, "Password  must be at least 8 character long")
      .required("Password  is required"),
  });

  useEffect(() => {
    if(isLoginSuccess) {
      navigate('/chaincode');
    }
  }, [isLoginSuccess])

  return (
    <BasicLayout image={bgImage}>
    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1} style={{lineHeight: 4 , color: "#fff", display: 'table', margin:"0 auto"}}>
            Integra NOCK 
          </MDTypography>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Formik
            initialValues={formValue}
            validationSchema={validation}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                if (scriptedRef.current) {
                  setStatus({ success: true });
                  setSubmitting(false);
                  onloginRequest(values);
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
                  <MDInput
                    fullWidth
                    type="text"
                    label="User name"
                    name="user_name"
                    value={values.user_name || ""}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.user_name && errors.user_name ? true : false}
                  />
                  <ErrorMessage name="user_name" component={MDTextError} />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    fullWidth
                    type="password"
                    label="Password"
                    name="password"
                    value={values.password || ""}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.password && errors.password ? true : false}
                  />
                  <ErrorMessage name="password" component={MDTextError} />
                </MDBox>
                {/* <MDBox display="flex" alignItems="center" ml={-1}>
                  <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    onClick={handleSetRememberMe}
                    sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                  >
                    &nbsp;&nbsp;Remember me
                  </MDTypography>
                </MDBox> */}
                <MDBox mt={4} mb={1}>
                  <MDButton
                    disableElevation
                    variant="gradient"
                    color="info"
                    type="submit"
                    fullWidth
                  >
                    sign in
                  </MDButton>
                </MDBox>
                {/* <MDBox mt={3} mb={1} textAlign="center">
                  <MDTypography variant="button" color="text">
                    Don&apos;t have an account?{" "}
                    <MDTypography
                      component={Link}
                      to="/authentication/sign-up"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                    >
                      Sign up
                    </MDTypography>
                  </MDTypography>
                </MDBox> */}
              </Form>
            )}
          </Formik>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}
const mapStateToProps = (state) => {
  return {
    isLoginSuccess: state.user.isLoginSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onloginRequest: (data) => {
      dispatch(loginRequest(data));
    },
  };
};

Basic.propTypes = {
  onloginRequest: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(Basic);
