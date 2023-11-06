import express from 'express';
import cors from 'cors';
import { connectToDatabase } from '../database/db.mjs';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/submit', async (req, res) => {
  try {
    const { client, user, db } = await connectToDatabase();
    const { username, pw } = req.body;

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

app.all("/*", (req, res) => {
  res.status(404).send({ message: "404: Path not found" })
})

app.listen(3000, () => {
  console.log('server is listening on port 3000')
})