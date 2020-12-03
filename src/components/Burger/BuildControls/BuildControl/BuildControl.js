import React from 'react';
import classes from './BuildControl.module.css';

const BuildControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      type="button"
      onClick={props.removed}
      disabled={props.disabled}
    >
      Less
    </button>
    <button
      className={classes.More}
      type="button"
      onClick={props.added}
    >
      More
    </button>
  </div>
);

export default BuildControl;
