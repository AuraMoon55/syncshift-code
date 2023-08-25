import {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {config} from '../config';

export default function Worklog({setTitle, appDb}){
  setTitle('SyncShift WorkLog');

  const [taskos, setTaskos] = useState([]);
  const [user] = useCookies(['user']);
  const [taskas, setTaskas] = useCookies(['tasks'])

  useEffect(() => {
    if(taskas.tasks){
      setTaskos(taskas.tasks);
    }else{
      appDb.listDocuments(config.databaseId, user.collection).then((ff) => {
        setTaskos(ff);
        setTaskas('tasks', ff.documents);
      });
    };
  },[taskos]);

  return (<>
  <h1 className="title">SyncShift</h1>
  <h3 className="headline">Shifting Management Tools</h3>
  <div className="check-in">
    <center>
    <button onClick={() => {window.location.href='/checkin'}} className="button1" style={{width: '101%'}}>Check-In</button>
    <br />
     <button onClick={() => {window.location.href='/checkout'}} className="button2" style={{width: "101%"}}>Check-Out</button>
    <br />
    <button onClick={() => {window.location.href='/worklog'}} className="button3" style={{width: "101%"}}>WorkLog</button>
    <br />
    <button onClick={() => {window.location.href='/settings'}} className="button4" style={{width: "101%"}}>Settings</button>
    </center>
</div>

<div className="mt-6">
  <h2 className="mb-2 text-xl font-bold">WorkLog</h2>
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-gray-200">
        <th className="px-4 py-2">Task</th>
        <th className="px-4 py-2">Date & Day Started</th>
        <th className="px-4 py-2">Time Started On</th>
        <th className="px-4 py-2">Time Ended</th>
        <th className="px-4 py-2">Date Ended</th>
        <th className="px-4 py-2">Time Spent</th> 
      </tr>
    </thead>
    <tbody id="taskHistoryTableBody">
      {taskos && taskos.map((i) => {
        return (<tr>
            <td className="border px-4 py-2">{i.name}</td>
            <td className="border px-4 py-2">{i.startDate}</td>
            <td className="border px-4 py-2">{i.startTime}</td>
            <td className="border px-4 py-2">{i.endTime}</td>
            <td className="border px-4 py-2">{i.endDate}</td>
            <td className="border px-4 py-2">{i.totalTime}</td>
          </tr>)
      })
      }
    </tbody>
  </table>
</div>
</>)
}
