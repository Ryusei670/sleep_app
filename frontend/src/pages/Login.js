import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Login = ({ handleAuth }) => {
  const classes = useStyles();
  return (
    <div data-testid="login" className={classes.root}>
      <LoginForm handleAuth={handleAuth} />
    </div>
  );
};

Login.propTypes = {
  handleAuth: PropTypes.func.isRequired,
};

export default Login;
