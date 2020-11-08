import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Moment from 'react-moment';
import 'moment-timezone';
import axios from 'axios';
import moment from 'moment';

function AddLog() {

  
  const [wakeUpTime, setWakeUpTime] = useState(new Date());
  const handleWakeUpChange = (e) => {setWakeUpTime(e)}; //updates value of hour/minute/second/AMPM
  const [sleepTime, setSleepTime] = useState(new Date());
  const handleSleepChange = (e) => {setSleepTime(e)}; //updates value of hour/minute/second/AMPM
  const [time_diff, setTimeDiff] = useState(0);
  const handleTimeDiffChange = (start, stop) => {
    var ms = moment(stop,"DD/MM/YYYY HH:mm:ss").diff(moment(start,"DD/MM/YYYY HH:mm:ss"));
    var d = moment.duration(ms);
    console.log(moment(stop,"DD/MM/YYYY HH:mm:ss"));
    console.log(moment(start,"DD/MM/YYYY HH:mm:ss"));
    console.log("Difference: ", ms);
    console.log("Duration: ", d);
    console.log("Duration (Hours): ",d.asHours().toFixed(2));
    console.log("react-moment dif: ", <Moment diff={start.toUTCString()} unit="hours" decimal>{stop}</Moment>);
    setTimeDiff(d.asHours().toFixed(2));
    // setTimeDiff(<Moment diff={start.toUTCString()} unit="hours" decimal>{stop}</Moment>)
  };
  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log({
      "username": "default",
      "first_name": "first",
      "last_name": "last",
      "sleep_time": sleepTime,
      "wake_time": wakeUpTime,
      "len": time_diff
    })

    if(time_diff > 0) {
      await axios.post("http://localhost:4000/api/log",
      {
        "username": "default",
        "first_name": "first",
        "last_name": "last",
        "sleep_time": sleepTime,
        "wake_time": wakeUpTime,
        "len": time_diff
      })
      console.log("Submit was clicked")
    } else {
      alert("Wake date must be after sleep date!");
    }

    
  }; //make this a function later

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

export default AddLog;
  

