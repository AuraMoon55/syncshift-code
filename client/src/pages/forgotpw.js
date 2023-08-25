import {config} from '../config';

export default function Login({setTitle, appAcc}){
  setTitle('SyncShift Login');

  const handleFirstSubmit = async (e) => {
    e.preventDefault();
    const enal = e.target[0].value.trim();
    try{
      const ra = await appAcc.createRecovery(enal, `${config.url}/forgotpw`);
    }catch(err){
      return alert(err.message)
    }
    if(Object.keys(ra).length > 0){
      window.location.href = '/';
    }
  }


  const handleSecondSubmit = async (e) => {
    e.preventDefault();

    let laf = window.location.search.substr(1).split("&");
    let faf = {};
    for(const a of laf){
      faf[a.split("=")[0]] = a.split("=")[1]
    }

    const enal = e.target[0].value.trim();
    const enaal = e.target[1].value.trim();
    try{
      const ra = await appAcc.updateRecovery(faf.userId, faf.secret, enal, enaal)
    }catch(err){
      return alert(err.message)
    }
    if(Object.keys(ra).length > 0){
      window.location.href = '/';
    }
  }

  if(window.location.search){

  return(<>
    <h1 className="title">SyncShift</h1>
    <h3 className="headline">Shifting Management Tools</h3>
    <form onSubmit={handleSecondSubmit} >
      <div className="container">
        <div className="form_contents">
        <label>Password : </label>
        <input type="text" placeholder="Enter New Password" name="pass" required />
        <label>Repeat : </label>
        <input type="text" placeholder="Repeat New Password" name="rpt-pass" required />
          
        <button className="login" >Update Password</button>

        <button onClick={() => {window.location.href='/newuser'}} className="b1">Create Account</button>

        <button onClick={() => {window.location.href='/index'}} className="b2">Login</button><br /><br />
        </div> 
      </div>
    </form>
    </>)
 
  }

  return(<>
    <h1 className="title">SyncShift</h1>
    <h3 className="headline">Shifting Management Tools</h3>
    <form onSubmit={handleFirstSubmit} >
      <div className="container">
        <div className="form_contents">
        <label>E-mail : </label>
        <input type="text" placeholder="Enter Username" name="username" required />
          
        <button className="login" >Send Link</button>

        <button onClick={() => {window.location.href='/newuser'}} className="b1">Create Account</button>

        <button onClick={() => {window.location.href='/index'}} className="b2">Login</button><br /><br />
        </div> 
      </div>
    </form>
    </>)

}
