import React from 'react';
import PropTypes from 'prop-types';
import 'moment-timezone';

const Home = ({auth}) => {
  return (
    <div className="Home">
      <header className="Home-header">
        <p>
          Welcome to the Sleep App!
        </p>
      </header>
    </div>
  );
}

Home.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export default Home;
  

