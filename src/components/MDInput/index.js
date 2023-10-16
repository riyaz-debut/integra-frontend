import React, { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
// import { ErrorMessage } from 'formik';

// Custom styles for MDInput
import MDInputRoot from "components/MDInput/MDInputRoot";
// import MDTextError from 'components/MDTextError/'

const MDInput = forwardRef(({ error, success, disabled, name, ...rest }, ref) => {
  return (
  <React.Fragment>
    <MDInputRoot name={name} {...rest} ref={ref} ownerState={{ error, success, disabled }} />
    {/* <ErrorMessage name={name} component={MDTextError} /> */}
  </React.Fragment>
)});

// Setting default values for the props of MDInput
MDInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the MDInput
MDInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
};

export default MDInput;
