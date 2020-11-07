import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Moment from 'react-moment';
import 'moment-timezone';

function App() {

  
  const [wakeUpTime, setWakeUpTime] = useState(new Date());
  const handleWakeUpChange = (e) => {setWakeUpTime(e)}; //updates value of hour/minute/second/AMPM
  const [sleepTime, setSleepTime] = useState(new Date());
  const handleSleepChange = (e) => {setSleepTime(e)}; //updates value of hour/minute/second/AMPM
  const [time_diff, setTimeDiff] = useState(new String());
  const handleTimeDiffChange = (start, stop) => {setTimeDiff(<Moment diff={start.toUTCString()} unit="hours" decimal>{stop}</Moment>)};
  const handleSubmit = (e) => {console.log("Submit was clicked")}; //make this a function later

  const user = "User";
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Hello {user}! Welcome to the Sleep App!
        </p>
        <p>
          Sleep Time: <DateTimePicker
            onChange= {(e) => {handleSleepChange(e); handleTimeDiffChange(e, wakeUpTime)}}
            value={sleepTime}
          />
        </p>
        <p>
          Wake Time: <DateTimePicker
            onChange= {(e) => {handleWakeUpChange(e); handleTimeDiffChange(sleepTime, e)}}
            value={wakeUpTime}
          />
        </p>
        <p>
          Sleep Length: {time_diff}
          <button onClick={handleSubmit}> Submit
          </button>
        </p>
      </header>
    </div>
  );
}

export default App;
  

