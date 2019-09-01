import React from 'react';

import { Container } from './styles';

export default function Input(props) {
  const { label, name, type, value, onChange, error, ...rest } = props;

  function handleChange(e) {
    const { value } = e.target;

    if (onChange) {
      onChange({ [name]: value });
    }
  }

  return (
    <Container error={error}>
      <span>{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={e => handleChange(e)}
        {...rest}
      />
      {error && <span>{error}</span>}
    </Container>
  );
}
