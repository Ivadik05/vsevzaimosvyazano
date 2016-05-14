import * as React from 'react';
let styles = require('./style.css');
let InputElement = require('react-input-mask');
let classNames = require('classnames');

type Props = {
  name: string;
  type?: 'text' | 'phone' | 'email';
  firstUpper?: boolean;
  required?: boolean;
  pattern?: any;
  placeholder: string;
  onChange: Function;
  onError?: Function;
}

type FormProps = {
  children?: any;
  onChange: Function;
}

function checkValidPattern(inputs, name, pattern, value) {
  if (pattern.test(value)) {
    inputs[name] = true;
    console.error('error hint hide'); 
  } else {
    inputs[name] = false;
    console.error('error hint');
  }
}

function checkValid(elem, value, type, inputs, name) {
  let pattern;
  if (elem.validity.valid) {
    if (value !== '') {
      switch (type) {
        case 'phone':
          pattern = /(\+7)?[\ ]?(\(?\d{3}\)?[\ ]?)?[\d\- ]{10}$/i;
          checkValidPattern(inputs, name, pattern, value);
          break;
        case 'email':
          pattern = /.+@.+..+/i;
          checkValidPattern(inputs, name, pattern, value);
          break;
        default:
          inputs[name] = true;
          break;
      }
    } else {
      inputs[name] = true;
    }
  } else {
    inputs[name] = false;
  }
}

function checkValidAll(inputs): boolean {
  let validates = Object.keys(inputs).map(item => inputs[item]);
  return validates.every(item => item);
}

export let Validate = (() => {
  let inputs = {};
  let onChangeAll;

  let Form = (props: FormProps) => {
    onChangeAll = props.onChange;
    return (
        <div className={styles.form}>
          {props.children}
        </div>
    );
  };

  let Input = (props: Props) => {
    if (inputs[props.name] === undefined) {
      if (props.required) {
        inputs[props.name] = false;
      } else {
        inputs[props.name] = true;
      }
    }
    let onChange = (event) => {
      let elem = event.currentTarget;
      let value = elem.value;
      if (props.firstUpper && value[0]) {
        value = value[0].toUpperCase() + value.slice(1);
        elem.value = value;
      }
      checkValid(elem, value, props.type, inputs, props.name);
      onChangeAll(checkValidAll(inputs));
      props.onChange(value, elem);
    };
    return (
        <div className={classNames(styles.input, {[styles.required]: props.required}, {[styles.error]: !inputs[props.name]})}>
          {props.type && props.type === 'phone' ?
              (<InputElement {...props} mask='+7 (999) 999-99-99' placeholder={props.placeholder} onChange={onChange} maskChar={null}/>) :
              (<input type='text' placeholder={props.placeholder} onInput={onChange} required={props.required && props.required}/>)}
        </div>
    );
  };

  return {
    Input: Input,
    Form: Form
  };
})();
