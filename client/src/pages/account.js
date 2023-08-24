import {useState} from 'react';

export default function MyAccount({setTitle, appAcc}){
  setTitle('My Account');
  const [usa, setUsa] = useState({});

  const handleSubmit = () => {
    appAcc.get().then((ra) => {
      let fa = ra;
      appAcc.getPrefs().then((era) => {
        setUsa({
          name: era,
          email: fa.email
        });
      });
    })
  }

  let fa = setTimeout(handleSubmit(), 10);
  clearTimeout(fa)
  return (<>
    <h1 className="title">SyncShift</h1>
    <h3 className="headline">Shifting Management Tools</h3>
    <center>
  <form>
    <label for="fname">First name:</label><br />
    <input type="text" style={{width:"50%"}} id="fname" name="fname" placeholder={(Object.keys(usa).length > 0) && usa.name.firstName} disabled />
    <br />
    <label for="lname">Last name:</label>
    <br />
    <input type="text" style={{width:"50%"}} id="lname" name="lname" placeholder={(Object.keys(usa).length > 0) && usa.name.lastName} disabled />
    <br />
    <label for="email">Email ID:</label>
    <br />
    <input type="text" style={{width:"50%"}} id="email" name="email" placeholder={(Object.keys(usa).length > 0) && usa.email} disabled />
</form>
    <br />
     <button onClick={() => {window.location.href='/delete'}} className="delete" style={{color: "red", width: "45%"}}>Delete Account</button>
    <button onClick={() => {window.location.href='/forgotpw'}} className="delete" style={{color:"red", width: "45%"}}>Change Password</button>
    </center>
<br />
  <br />
  <br />
  <center><button onClick={() => {window.location.href='/settings'}} className="button3" style={{width: "30%"}}>Back</button></center>
</>);

}
