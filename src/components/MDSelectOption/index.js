import React from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const MDSelectOption = (props) => {
  const { name, options, message, ...rest } = props;
  return (
    <React.Fragment>
      {options?.length < 1 ? (
        <TextField name={name} {...rest}>
          <option disabled></option>
          <option disabled>{message ? message : "No data available"}</option>
        </TextField>
      ) : (
        <TextField name={name} {...rest}>
          <option disabled></option>
          {options.map((option) => (
            <option
              key={option.id}
              value={option.id || option.Id}
              disabled={option.value === "" ? true : false}
            >
              {option.name}
            </option>
          ))}
        </TextField>
      )}
    </React.Fragment>
  );
};

MDSelectOption.propTypes = {
  name: PropTypes.string,
  options: PropTypes.any,
};

export default MDSelectOption;
