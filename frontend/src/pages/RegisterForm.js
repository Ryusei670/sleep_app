import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import ErrorReqMsg from './ErrorReqMsg';

const useStyles = makeStyles((theme) => ({
  container: {
    '& > *': {
      margin: theme.spacing(1),
    },
    width: '20rem',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    color: 'primary',
  },
  text: {
    textAlign: 'center',
  },
}));

const RegisterForm = ({handleAuth}) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    first_name: '',
    last_name: '',
  });

  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [usernameCheck, setUsernameCheck] = useState(false);

  const handleError = () => {
    setError(true);
    return 'Network Error';
  };

  const PostLoginUser = (userData) => {
    // const handleError = () => {};
    const signInUrl = 'http://localhost:4000/api/signin';
    const axiosHeaders = {
      'Content-Type': 'application/json',
    };
    setLoading(true);
    axios
      .post(signInUrl, userData, { headers: axiosHeaders })
      .then((response) => {
        console.log(Object.keys(response.data).length);
        if(Object.keys(response.data).length > 0) {
          window.localStorage.setItem('username', response.data.username);
          window.localStorage.setItem('auth', true);
          handleAuth(true);
          history.replace('/user/logs');
        }
      })
      .catch(handleError)
      .finally(() => {
        setLoading(false);
      });
  };

  const PostAddUser = (userData) => {
    const signupUrl = 'http://localhost:4000/api/newuser';
    const axiosHeaders = {
      headers: { 'Content-Type': 'application/json' },
    };
    const handleError = () => {};
    setLoading(true);
    axios
      .post(signupUrl, userData, { headers: axiosHeaders })
      .then((res) => {
        console.log(res.data)
        console.log(Object.keys(res.data).length > 0)
        if (Object.keys(res.data).length === 0) {
          console.log("duplicate found")
          setUsernameCheck(true);
        } else {
          console.log("all good to proceed")
          PostLoginUser(userData);
        }
      })
      .catch(handleError)
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.username ||
      !formData.password ||
      !formData.passwordConfirm
    ) {
      setError(true);
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
    //   setError(true);
    } else if (formData.password !== formData.passwordConfirm) {
      setError(true);
    } else if (formData.password === formData.passwordConfirm) {
      console.log("going to post new user")
      PostAddUser({ ...formData, username: formData.username.toLowerCase() });
    }
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setUsernameCheck(false);
  };

  const classes = useStyles();
  return (
    <div data-testid="registerForm">
      <form className={classes.container} onSubmit={handleSubmit}>
        <h1 align="center">Register</h1>
        <TextField
          error={isError}
          helperText={isError ? 'Please Enter your First Name' : ''}
          id="first_name"
          data-testid="first_name"
          label="First Name"
          variant="outlined"
          m={20}
          value={formData.first_name}
          onChange={(e) => handleChange(e)}
          required
        />
        <TextField
          error={isError}
          helperText={isError ? 'Please Enter your Last Name' : ''}
          id="last_name"
          data-testid="last_name"
          label="Last Name"
          variant="outlined"
          m={20}
          value={formData.last_name}
          onChange={(e) => handleChange(e)}
          required
        />
        <TextField
          error={isError}
          helperText={isError ? 'Username already in use' : ''}
          id="username"
          label="Username"
          variant="outlined"
          m={20}
          value={formData.username}
          onChange={(e) => handleChange(e)}
          required
        />
        <TextField
          error={isError}
          helperText={isError ? 'Check your Passowrd' : ''}
          id="password"
          label="Password-Field"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={formData.password}
          onChange={(e) => handleChange(e)}
          required
        />
        <TextField
          error={isError}
          helperText={isError ? 'Your Passwords Must Match' : ''}
          id="passwordConfirm"
          label="Confirm Password"
          type="password"
          autoComplete="confirm-password"
          variant="outlined"
          value={formData.passwordConfirm}
          onChange={(e) => handleChange(e)}
          required
        />
        <Button
          variant="outlined"
          className={classes.button}
          onClick={(e) => handleSubmit(e)}
          disabled={loading}
          data-testid="submit"
        >
          Complete Registration
        </Button>
        <ErrorReqMsg
          open={usernameCheck}
          handleClose={() => handleClose()}
          errorMsg="Username is already in use! Please try again."
        />
        <small className={classes.text}>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          Already have an account? Log in <Link to="/login">here</Link>
        </small>
      </form>
    </div>
  );
};

RegisterForm.propTypes = {
  handleAuth: PropTypes.func.isRequired,
};

export default RegisterForm;
