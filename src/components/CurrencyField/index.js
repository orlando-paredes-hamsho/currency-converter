import React from 'react';
import './index.css';

function CurrencyField(props) {
  return (
    <fieldset>
      <label htmlFor={props.id}>
        USD
      </label>
      <input id={props.id} type="number" className="currency_field"/>
    </fieldset>
  );
}

export default CurrencyField;
