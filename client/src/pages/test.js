import {useState} from 'react';
import moment from 'moment';

const Testa = ({setTitle}) => {
  setTitle("Test Page Reminedee");

  const [task, setTask] = useState({});
  const [mom, setMom] = useState(null);
  const [fak, setFak] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let startTime = moment();
    setMom(startTime);
    setTask({
      name: e.target[0].value.trim(),
      startTime: startTime.format("MMM D, YYYY (ddd) HH:mm:ss")
    })
    setFak(setInterval(() => {setMom(moment(task.startTime).add(1, "seconds"))}, 1000));
  }

  const handleClick = (e) => {
    if(mom){
      clearInterval(fak);
      setFak(null);
      setMom(null);
    }
  }
  return (<>
    <form onSubmit={handleSubmit} >
    <input type="text" placeholder="Enter Task" />
    <button>Start</button>
    </form>
    <p>{mom ? mom.format("HH:mm:ss") : "00:00:00"}</p>
    <p>{(Object.keys(task).length > 0) ? `Started: ${task.startTime}` : ''}</p>
    {mom && <button onClick={handleClick} >Stop</button>}
  </>)
}

export default Testa
