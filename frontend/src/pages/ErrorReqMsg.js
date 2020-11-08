import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const ErrorReqMsg = ({ handleClose, open, errorMsg }) => {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => handleClose()}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          onClose={() => handleClose()}
        >
          {errorMsg}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

ErrorReqMsg.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string.isRequired,
};

export default ErrorReqMsg;
