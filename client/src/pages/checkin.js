import {useState, useRef, useEffect} from 'react';
import moment from 'moment';
import {useCookies} from 'react-cookie';
import {config} from '../config';
import {ID} from 'appwrite';

export default function Checkin({setTitle, appDb}){
  setTitle('Check-In Page');

  /** Backend Work **/

  const [user] = useCookies(['user']);
  const [tasko, setTasko] = useState(null);
  const [visibi, setVisibi] = useState(false);
  const [mom, setMom] = useState(0);
  const [fak, setFak] = useState(null);



  function useInterval(callback, delay) {
    const intervalRef = useRef(null);
    const savedCallback = useRef(callback);
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
      const tick = () => savedCallback.current();
      if (typeof delay === 'number') {
        intervalRef.current = window.setInterval(tick, delay);
        return () => window.clearInterval(intervalRef.current);
      }
    }, [delay]);
    return intervalRef;
  }

  function formatTime(totalSeconds) {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
    }
    
  const handleSubmit = (e) => {
    e.preventDefault();
    let startTime = moment();
    setTasko({
      name: e.target[0].value.trim(),
      startString: startTime.format("MMM D, YYYY (ddd), HH:mm:ss"),
      startDate: startTime.format("MMM D, YYYY (ddd)"),
      startTime: startTime.format("HH:mm:ss"),
      mome: startTime
    });
    setFak("OK");
  }

  const handleClick = async (e) => {
    let fat = {
      endDate: moment().format("MMM D, YYY (ddd)"),
      endTime: moment().format("HH:mm:ss"),
      totalTime: formatTime(mom),
      name: tasko.name,
      startString: tasko.startString,
      startDate: tasko.startDate,
      startTime: tasko.startTime
    };
    setFak(null);
    try{
      await appDb.createDocument(config.databaseId, user.collection, ID.unique(), fat)
    }catch(err){
      alert(err.message)
    }
  }

  useInterval(
    () => {
      setMom((mom) => mom + 1);
    },
    fak ? 1000 : null
  );


  /** Frontend Work **/
  
  return (<>
  <h1 className="title">SyncShift</h1>
  <h3 className="headline">Shifting Management Tools</h3>

  <div className="check-in">
    <center>
    <button onClick={() => {window.location.href='/checkin'}} className="button1" style={{width: "101%"}}>Check-In</button>
    <br />
     <button onClick={() => {window.location.href='/checkout'}}  className="button2" style={{width: "101%"}}>Check-Out</button>
    <br />
    <button onClick={() => {window.location.href='/worklog'}} className="button3" style={{width: "101%"}}>WorkLog</button>
    <br />
    <button onClick={() => {window.location.href='/settings'}} className="button4" style={{width: "101%"}}>Settings</button>
    </center>
  </div>

  <div className="items-center justify-center w-full h-full bg-gray-100 current">

    <div className="flex items-center justify-center w-64 h-64 font-medium text-white text-3xl bg-[#04a96d] rounded-full mx-auto my-auto" onClick={() => {setVisibi(!visibi)}} >Check In</div>
  </div>
  {
    visibi && (
 <div className="hidden bg-gray-100 later">
   <div className="flex items-center justify-center min-h-screen">
     <div className="p-8 bg-white rounded-lg shadow-md">
       <h1 className="mb-6 text-4xl font-bold">Task Time Counter</h1>
       <form onSubmit={handleSubmit} className="flex items-center mb-4">
         <input type="text" id="taskName" className="flex-1 px-4 py-2 border border-gray-400 rounded-l-md" placeholder="Enter task name..." />
         <button id="startStopBtn" className="px-4 py-2 text-white bg-green-500 rounded-r-md">Check in</button>
       </form>
       <div id="timerDisplay" className="mb-4 text-5xl font-bold">{mom ? formatTime(mom) : "00:00:00"}</div>
        <button onClick={handleClick} id="stopBtn" className="hidden px-4 py-2 text-white bg-red-500 rounded-md">Check Out</button>
        <p className="text-sm" id="startDateTime">{tasko && tasko.startString}</p>
      </div>
    </div>
  </div>
    ) 
  }
  </>)
}

