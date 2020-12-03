import React from 'react';
import Buildcontrol from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildControls = props => (
  <div className={classes.BuildControls}>
    {controls.map(ctrl => (
      <Buildcontrol key={ctrl.label} label={ctrl.label} />
    ))}
  </div>
);

export default BuildControls;
