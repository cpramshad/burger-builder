import React from 'react';
import classes from './Input.module.css';

const input = props => {
  let inputElement = null;
  console.log(props.elementType);
  switch (props.elementType) {
    case ('input'):
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case ('textarea'):
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case ('select'):
      inputElement = (
        <select
          className={classes.InputElement}
          value={props.value}
          //onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      console.log(inputElement);
      break;
    default:
      inputElement = (
        <>
          {/* <label htmlFor={props.id} className={classes.Label}>{props.label}</label> */}
          <input
            id={props.id}
            className={classes.InputElement}
            {...props.elementConfig}
            value={props.value}
          />
        </>
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
