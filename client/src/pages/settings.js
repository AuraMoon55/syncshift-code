import {useCookies} from 'react-cookie';


export default function Setting({setTitle, appAcc}){
  setTitle('Settings');
  const [user, setUser, remUser] = useCookies(['user']);

  const handleClick = (e) => {
    e.preventDefault();

    appAcc.deleteSession("current").then(() => {
      for(const i of Object.keys(user)){
        remUser(i);
      };
      console.log(Object.keys(user));
      window.location.href='/'
    });
  }
  return (<>
  <h1 className="title">SyncShift</h1>
  <h3 className="headline">Shifting Management Tools</h3>

  <div className="check-in">
    <center>
      <button onClick={() => {window.location.href='/checkin'}} className="button1" style={{width: "100%"}}>Check-In</button>
      <br />
      <button onClick={() => {window.location.href='/checkout'}} className="button2" style={{width: "100%"}}>Check-Out</button>
      <br />
      <button onClick={() => {window.location.href='/worklog'}} className="button3" style={{width: "100%"}}>Work Log</button>
      <br />
      <button onClick={() => {window.location.href='/settings'}} className="button4" style={{width: "100%"}}>Settings</button>
    </center>
  </div>
  <ul>
    <div className="settings_menu">
      <br />
      <button className="settings_button" onClick={() => {window.location.href='/myaccount'}}
        style={{position: "center", width: "90%"}}>My Account</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => {window.location.href='/tos'}} className="settings_button"
        style={{position:"center",width:"90%"}}>Privacy & Security </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => {window.location.href='/about'}} className="settings_button"
        style={{position: "center",width:"90%"}}>About Us</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={handleClick} className="settings_button" style={{position:"center", width:"90%"}}>Log
        Out</button>
    </div>
  </ul>
  </>);
}
