import express from 'express';
import cors from 'cors';
import { connectToDatabase } from '../database/db.mjs';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/signup', async (req, res) => {

  try {
    const { client, user, db } = await connectToDatabase();
    const { username, pw } = req.body;
    console.log(username);

    const userData = {
      username: username,
      pw: pw
    }
    const result = await user.insertOne(userData);

    if (result.insertedId) {
      res.status(200).send({ message: "data saved successfully" });
    } else {
      throw new Error;
    }
  } catch (err) {
    console.log(err);
  }
})

app.post('/signin', async (req, res) => {
  try {
    const { client, user, db} = await connectToDatabase();
    const { username, pw} = req.body;

    const userData = {
      username: username,
      pw: pw
    }

    const existingUser = await user.findOne({ username: userData.username, pw: userData.pw});

    if (existingUser) {
      res.status(200).send({message: 'Logged in'});
    } else {
      res.status(404).send({message: 'User not found'});
    }
  } catch (err) {
    console.log(err)
  }
})

app.all("/*", (req, res) => {
  res.status(404).send({ message: "404: Path not found" })
})

app.listen(3000, () => {
  console.log('server is listening on port 3000')
})