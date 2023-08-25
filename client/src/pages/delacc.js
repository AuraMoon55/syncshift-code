export default function DelAcc({setTitle}){
  setTitle('My Account');
  return (<>
    <h1 className="title">SyncShift</h1>
    <h3 className="headline">Shifting Management Tools</h3>
  <center>
    <button onclick={() => {}} className="delete" style={{color:"red", width: "45%"}}>Delete Account</button> 
  </center>
  </>);
}
