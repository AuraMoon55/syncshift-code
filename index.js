const {Client, ID, Databases, Permission, Role} = require('node-appwrite');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const config = require('./config');
const app = express();
const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject(config.projectId).setKey(config.apiKey);

const appDb = new Databases(client)

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('json spaces', 2)


app.listen(8080, () => {
  console.log('Syncshift Api running at 8080');
});

app.get('/api/getCol', (req, res) => {
  appDb.listCollections(config.databaseId).then((resp) => {
    let f = resp.collections.filter((i) => {return (i.name.trim() === req.query.userid)});
    if(f.length < 1){
      return res.status(504).json({
        status: "error",
        error: "No Collection found for this user"
      });
    }else{
      return res.json({
        status: "OK",
        colId: f[0]['$id']
      });
    };
  });
});


app.get("/api/col", async (req, res) => {
  let ren = await appDb.createCollection(config.databaseId, ID.unique(), req.query.userid, [Permission.read(Role.user(req.query.userid)), Permission.write(Role.user(req.query.userid))])
  await appDb.createStringAttribute(config.databaseId, ren['$id'], 'startString', 128, true);
  await appDb.createStringAttribute(config.databaseId, ren['$id'], 'startDate', 128, true);
  await appDb.createStringAttribute(config.databaseId, ren['$id'], 'startTime', 128, true);
  await appDb.createStringAttribute(config.databaseId, ren['$id'], 'endDate', 128, true);
  await appDb.createStringAttribute(config.databaseId, ren['$id'], 'endTime', 128, true);
  await appDb.createStringAttribute(config.databaseId, ren['$id'], 'name', 128, true);
  await appDb.createStringAttribute(config.databaseId, ren['$id'], 'totalTime', 128, true);

  return res.json({
    status: "OK",
    colId: ren["$id"]
  });
});
