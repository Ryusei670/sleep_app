import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './pages/PrivateRoute';
import 'moment-timezone';
import AddLog from './pages/AddLog';
import Navigation from './pages/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  // localStorage.setItem('username', "default")
  // localStorage.setItem('auth', localStorage.getItem('username') === "default")
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('auth') !== "false") {
      setAuth(true);
      setUsername(localStorage.getItem('username'));
    }
  }, [auth, username]);

  console.log("before App return: ", localStorage.getItem('auth'))
  
  return (
    <div>
      <Router>
        <Navigation
          auth={auth}
          handleAuth={setAuth}
          username={username}
          setUsername={setUsername}
        />
        <div className="App" data-testid="App">
          <Switch>
            <Route exact path="/">
              <Home
                username={username}
                auth={auth}
              />
            </Route>
            <Route exact path="/login">
              <Login handleAuth={setAuth} />
            </Route>
            <Route exact path="/register">
              <Register handleAuth={setAuth} />
            </Route>
            <PrivateRoute auth={auth} exact path="/user/logs/">
              <AddLog username={username} />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
  

