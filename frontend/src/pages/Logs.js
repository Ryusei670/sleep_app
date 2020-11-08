import React, { useState, useEffect } from 'react';
import 'moment-timezone';
import axios from 'axios';
import './Logs.css'

function Logs() {
    const [logList, setLogList] = useState([]);

    const user = localStorage.getItem('username');

    useEffect(() => {
        ;(async () => {
            const resp = await axios.get(`http://localhost:4000/api/logs/${user}`)
            console.log(resp.data)
            setLogList(resp.data)
        })()
    }, []);

    return (<table style={{width: "100%"}}>
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
    </table>);
}

export default Logs;
  

