import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, TInput, InputContainer, Label} from './styles';

function Input({style, label, icon, ...rest}, ref) {
  return (
    <Container style={style}>
      {label && <Label>{label}</Label>}
      <InputContainer>
        {icon && <Icon name={icon} size={20} color="rgba(255,255,255,0.6)" />}
        <TInput {...rest} ref={ref} />
      </InputContainer>
    </Container>
  );
}

Input.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
};

Input.defaultProps = {
  styles: {},
  label: null,
  icon: null,
};

export default forwardRef(Input);
