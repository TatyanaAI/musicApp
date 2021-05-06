import React from "react";
import {TextField, Grid} from "@material-ui/core";
import PropTypes from 'prop-types';

const FormElement = ({name, label, value, onChange, required, error, type}) => {
  return (
    <Grid item xs>
      <TextField
        required={required}
        error={!!error}
        helperText={error}
        id={name}
        label={label}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={name}
      />
    </Grid>
  );
};

FormElement.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    type: PropTypes.string,
    error: PropTypes.string
  };

  export default FormElement;
