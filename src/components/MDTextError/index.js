import React from "react";
import { FormHelperText } from '@mui/material';
import PropTypes from "prop-types";

const MDTextError = (props) => {
    const { children } = props
    return (
        <React.Fragment>
            <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ fontWeight: 'bold', pl:1}}>
                {children}
            </FormHelperText>
        </React.Fragment>
    );
};

MDTextError.propTypes = {
    children: PropTypes.string,
  };

export default MDTextError;
