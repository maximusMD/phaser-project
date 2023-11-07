import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://<Username>:<PW>@atlascluster.d0u463g.mongodb.net/?retryWrites=true&w=majority`;
// My collection names, update as needed
const dbName = 'NinjaGame'
const userCollection = 'UserData';
const scoreCollection = 'Scores';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export async function connectToDatabase() {
  try {
    await client.connect();

    await client.db('admin').command({ping: 1});
    console.log("Pinged your deployment. Successfully connected");

    const db = client.db(dbName);
    const user = db.collection(userCollection);
    const scores = db.collection(scoreCollection);

    return { client, user, scores, db}
    
  } catch(err) {
    console.log(err)
  } finally {
    client.close();
  }
}