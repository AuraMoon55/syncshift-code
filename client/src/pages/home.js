import {useCookies} from 'react-cookie';
import {config} from '../config'

const Home = ({setTitle, appAcc}) => {
  const [user, setUser] = useCookies(['user']);
  setTitle('SyncShift Login');


  /** BackEnd Work **/
  
  const lala = async () => {
    const era = await appAcc.get()
    try{
      let ra = JSON.parse(era.name);
      await appAcc.updatePrefs(ra)
      await appAcc.updateName(Object.values(ra)[0] + " " + Object.values(ra)[1])
    }catch(err){
      console.log("OK")
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value.trim();
    const pass = e.target[1].value.trim();

    try{
      const er = await appAcc.createEmailSession(email, pass)
    }catch(err){
      return alert(err.message)
    }
    let resp = await fetch(`${config.apiUrl}/api/getCol?userId=${er.userId}`)
    if(!resp.ok){
      resp = await fetch(`${config.apiUrl}/api/col?userId=${er.userId}`)
    }
    resp = await resp.json();
    setUser('name', er);
    setUser('collection', resp.colId)
    await lala();
    window.location.href = '/checkin';

  };
   const lemao = () => {
     if(Object.entries(user).length > 0){
       return window.location.href = '/checkin'
     }
   }

   lemao();
  return (<> 
    <h1 className="title">SyncShift</h1>
    <h3 className="headline">Shifting Management Tools</h3>
    <form onSubmit={handleSubmit} >
      <div className="container">
        <div className="form_contents">
        <label>Username : </label>
        <input type="text" placeholder="Enter Username" name="username" required />
        
        <label>Password : </label>
        <input type="password" placeholder="Enter Password" name="password" required />
        
        <button className="login">Login</button>
        
        <input className="remember" type="checkbox" checked="checked" placeholder="Remember me" /><br />

        <button onClick={() => {window.location.href='/newuser'}} className="b1">Create Account</button>

        <button onClick={() => {window.location.href='/forgotpw'}} className="b2">Forgot Password</button><br /><br />
        </div> 
      </div>
    </form>
  </>);
}

export default Home;
