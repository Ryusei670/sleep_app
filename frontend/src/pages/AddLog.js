import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'moment-timezone';
import axios from 'axios';
import moment from 'moment';
import './Logs.css'

const AddLog = ({username}) => {

  const [loading, setLoading] = useState(false);

  const [wakeUpTime, setWakeUpTime] = useState(new Date());
  const handleWakeUpChange = (e) => {setWakeUpTime(e)}; //updates value of hour/minute/second/AMPM

  const [sleepTime, setSleepTime] = useState(new Date());
  const handleSleepChange = (e) => {setSleepTime(e)}; //updates value of hour/minute/second/AMPM
  
  const [time_diff, setTimeDiff] = useState(0);
  const handleTimeDiffChange = (start, stop) => {
    var ms = moment(stop,"DD/MM/YYYY HH:mm:ss").diff(moment(start,"DD/MM/YYYY HH:mm:ss"));
    var d = moment.duration(ms);
    setTimeDiff(d.asHours().toFixed(2));
  };

  const user = localStorage.getItem('username');

  const [logList, setLogList] = useState([]);
  useEffect(() => {
      ;(async () => {
          const resp = await axios.get(`http://localhost:4000/api/logs/${user}`)
          console.log(resp.data)
          setLogList(resp.data)
      })()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true);
    console.log({
      "username": username,
      "sleep_time": sleepTime,
      "wake_time": wakeUpTime,
      "len": time_diff
    })

    if(time_diff > 0) {
      const resp = await axios.post("http://localhost:4000/api/log",
      {
        "username": username,
        "sleep_time": sleepTime,
        "wake_time": wakeUpTime,
        "len": time_diff
      }).then((resp) => {
        if(Object.keys(resp.data).length !== 0) {setLogList([...logList, resp.data])}

        console.log("Submit was clicked");
      }).catch((e) => alert(e))
      .finally(() => {
        setLoading(false);
      });
    } else {
      alert("Wake date must be after sleep date!");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello {username}! Review your sleep schedule or add to your log here!
        </p>
        <p>
          Sleep Time: <DateTimePicker
            onChange= {(e) => {
              if(e != null) {
                handleSleepChange(e);
                handleTimeDiffChange(e, wakeUpTime);
              } else {
                alert("Date cannot be empty!");
              }
            }}
            value={sleepTime}
          />
        </p>
        <p>
          Wake Time: <DateTimePicker
            onChange= {(e) => {
              if(e != null) {
                handleWakeUpChange(e);
                handleTimeDiffChange(sleepTime, e);
              } else {
                alert("Date cannot be empty!");
              }
            }}
            value={wakeUpTime}
          />
        </p>
        <p>
          Sleep Length: {time_diff}
          <button onClick={handleSubmit} disabled={loading}> Submit
          </button>
        </p>
      </header>
        {/* <LogList /> */}
        <table style={{width: "100%"}}>
          <th>Sleep Time</th>
          <th>Wake Time</th>
          <th>Sleep Length</th>
          {logList.map(log =>
          <tr>
              <td>{log.sleep_time}</td>
              <td>{log.wake_time}</td>
              <td>{log.len}</td>
          </tr>
          )}
        </table>
    </div>
  );
}

export default AddLog;
  

