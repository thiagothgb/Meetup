import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';
import { useField } from '@rocketseat/unform';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

registerLocale('pt-BR', pt);

export default function({ name, placeholder, style, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <div className="wrapper-datepicker" style={style}>
      <ReactDatePicker
        name={fieldName}
        selected={selected}
        placeholderText={placeholder}
        onChange={date => setSelected(date)}
        ref={ref}
        locale="pt-BR"
        {...rest}
      />
      {error && <span>{error}</span>}
    </div>
  );
}
