import {useCookies} from 'react-cookie';

const Home = ({setTitle, appAcc}) => {
  const [user, setUser] = useCookies(['user']);
  setTitle('SyncShift Login');

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

    const er = await appAcc.createEmailSession(email, pass)
    console.log(er);
    setUser('name', JSON.stringify(er))
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
