import { Grid } from '@material-ui/core';
import { GridProps } from '@material-ui/core/Grid';
import itemGridStyle from 'assets/jss/kiloStyles/itemGridStyle';
import * as React from 'react';

interface Props {
  className?: string;
  noPadding?: boolean;
}

const ItemGrid: React.FC<
  Props & Pick<GridProps, Exclude<keyof GridProps, keyof Props>>
> = props => {
  const { children, className, noPadding, ...rest } = props;
  const classes = itemGridStyle();

  return (
    <Grid item {...rest} className={classes.grid + (noPadding ? ' ' + classes.noPadding : '') + (className ? ' ' + className : '')}>
      {children}
    </Grid>
  );
};

export default ItemGrid;
