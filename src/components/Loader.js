import React from 'react';
import { makeStyles, CircularProgress, Backdrop } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Loader(props) {
  const classes = useStyles();

  return (
      <Backdrop className={classes.backdrop} open={props.open} onClick={props.handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
  );
}