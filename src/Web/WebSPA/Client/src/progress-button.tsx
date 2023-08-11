import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

type Props = {loading: boolean, success: boolean, onClick: any};

export default function ProgressButton({loading, success, onClick}: Props) {
  const classes = useStyles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  return (
    <div className={classes.root}>

      <div className={classes.wrapper}>
        <Button
          type='submit'
          color='secondary'
          variant='contained'
          className={buttonClassname}
          disabled={loading}
          onClick={onClick}
        >
          Submit
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}
