import React from 'react';
import PropTypes from 'prop-types';
import InputMask from "react-input-mask";

export default function Input({
  optionalClassName,
  label,
  type,
  name,
  handleInputChange,
  value,
  required,
  pattern,
  autoFocus,
  defaultValue
}) {
  return (
    <div className={`mb-3 ${optionalClassName}`}>
        <label className="form-label" htmlFor={name}>{label}</label>
        <InputMask
          id={name}
          type={type}
          className="form-control"
          onChange={handleInputChange}
          name={name}
          value={value}
          required={required}
          mask={pattern}
          autoFocus={autoFocus}
        />
    </div>
  )
}

Input.defaultProps = {
  optionalClassName: '',
  required: false,
  autoFocus: false,
  pattern: '',
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}
