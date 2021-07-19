import React from 'react';
import { Legend } from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';

 const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});

const legendLabelStyles = () => ({
  label: {
    whiteSpace: 'nowrap',
  },
});

export const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);

 const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);

export const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);

export const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
