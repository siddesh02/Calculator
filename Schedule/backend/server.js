const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
const app = express();

const mongoClient = mongodb.MongoClient;
const connectionURL = "mongodb://localhost:27017";
const ObjectId = mongodb.ObjectId;

app.use(cors());
app.use(express.json());

const port = 8000;
const dbName = "schedule";
const collection = "schedules";

// routes

app.get("/api/get-schedules", (req, res) => {
  mongoClient.connect(
    connectionURL,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) {
        return console.log(err);
      }

      const db = client.db(dbName);
      db.collection(collection)
        .find()
        .toArray()
        .then((result) => {
          res.send(result);
        });
    }
  );
});

app.post("/api/create-schedule", (req, res) => {
  const from = req.body.from;
  const to = req.body.to;
  const date = req.body.date;
  const price = req.body.price;
  

  mongoClient.connect(
    connectionURL,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) {
        return console.log(err);
      }

      const db = client.db(dbName);
      db.collection(collection)
        .insertOne({
          from: from,
          to: to,
          date: date,
          price: price,
        })
        .then((result) => {
          res.send(result);
        });
    }
  );
});

app.put("/api/update-schedule", (req, res) => {
  const id = req.body.id;
  const from = req.body.from;
  const to = req.body.to;
  const date = req.body.date;
  const price = req.body.price;

  console.log(id);

  mongoClient.connect(
    connectionURL,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) {
        return console.log(err);
      }

      const db = client.db(dbName);
      db.collection(collection)
        .updateOne(
          { _id: ObjectId(id) },
          {
            $set: {
              from: from,
              to: to,
              date: date,
              price: price,
            },
          }
        )
        .then((result) => {
          res.send(result);
        });
    }
  );
});

app.delete("/api/delete-schedule/:id", (req, res) => {
  const id = req.params.id;

  console.log(req.params.id);

  mongoClient.connect(
    connectionURL,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) {
        return console.log(err);
      }

      const db = client.db(dbName);
      db.collection(collection)
        .deleteOne({
          _id: ObjectId(id),
        })
        .then((result) => {
          res.send(result);
        });
    }
  );
});

app.listen(port, () => {
  console.log("LISTENING ON PORT " + port);
});
