import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

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
  link: {
    textDecorationLine: 'none',
  },
}));

const LoginForm = ({ handleAuth }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const handleError = () => {
    setError(true);
    return 'Network Error';
  };

  const PostLoginUser = (userData) => {
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
          history.replace('/user/logs/');
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
    console.log(formData)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username.length === 0 || formData.password.length === 0) {
      setError(true);
    // }
    // if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
    //   setError(true);
    } else {
      PostLoginUser({ ...formData, username: formData.username.toLowerCase() });
    }
  };

  const classes = useStyles();
  return (
    <div data-testid="loginForm">
      <form className={classes.container} onSubmit={handleSubmit}>
        <h1 align="center">Login</h1>
        <TextField
          error={isError}
          helperText={isError ? 'Check Your Username and Password' : ''}
          data-testid="username"
          id="username"
          label="Username"
          variant="outlined"
          m={20}
          value={formData.username}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          error={isError}
          helperText={isError ? 'Check Your Username and Password' : ''}
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={formData.password}
          onChange={(e) => handleChange(e)}
        />
        <Button
          variant="outlined"
          className={classes.button}
          onClick={(e) => handleSubmit(e)}
          disabled={loading}
          data-testid="loginButtonForm"
          id="login"
          type="submit"
        >
          Login
        </Button>
        <small className={classes.text}>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          Dont have an account? Register <Link to="/register">here</Link>
        </small>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleAuth: PropTypes.func.isRequired,
};

export default LoginForm;
