import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    color: 'inherit',
    textDecorationLine: 'none',
    '&:hover': {
      color: 'white',
    },
  },
}));

const Navigation = ({ auth, handleAuth, username, setUsername }) => {
  const history = useHistory();
  const classes = useStyles();

  const handleLogout = () => {
    handleAuth(false);
    setUsername('');
    localStorage.clear();
    localStorage.setItem('auth', false);
    history.replace('/');
    console.log("in handleLogout: ", auth);
  };

  // console.log(auth);

  return (
    <div data-testid="navbar">
      <AppBar position="sticky">
        <Toolbar>
          {auth ? (
            <Typography variant="h6" className={classes.title}>
              <Link to="/" className={classes.button} data-testid="Home">
                <Button className={classes.button}>Home</Button>
              </Link>
              <Link to="/user/logs/" className={classes.button} data-testid="UserLogs">
                <Button className={classes.button}>Activity</Button>
              </Link>
            </Typography>
          ) : (
            <Typography variant="h6" className={classes.title}>
              <Link to="/" className={classes.button} data-testid="Home">
                <Button className={classes.button}>Home</Button>
              </Link>
            </Typography>
          )}

          {auth ? (
            <div>
              <Button className={classes.button}>Hello, {username}</Button>
              <Button
                onClick={handleLogout}
                className={classes.button}
                data-testid="logout"
              >
                Logout
              </Button>
            </div>
          ) : (
            <React.Fragment key="key">
              <Link to="/login" className={classes.button} data-testid="login">
                <Button className={classes.button}>Login</Button>
              </Link>
              <Link to="/register" className={classes.button} data-testid="register">
                <Button className={classes.button}>Register</Button>
              </Link>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navigation.propTypes = {
  auth: PropTypes.bool.isRequired,
  handleAuth: PropTypes.func.isRequired,
  username: PropTypes.string,
  setUsername: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
  username: '',
};

export default Navigation;
