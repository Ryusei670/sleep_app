import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import RegisterForm from './RegisterForm';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Register = (props) => {
  const { handleAuth } = props;
  const classes = useStyles();
  return (
    <div className={classes.root} data-testid="register">
      <RegisterForm handleAuth={handleAuth} />
    </div>
  );
};

Register.propTypes = {
  handleAuth: PropTypes.func.isRequired,
};

export default Register;
