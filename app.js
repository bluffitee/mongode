const { MongoClient } = require("mongodb");
const express = require("express");
require("dotenv").config();
let PORT = process.env.PORT || 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const uri = process.env.MONGODB_URI;

// const client = new MongoClient(
// 	uri,
// 	{ useNewUrlParser: true },
// 	{ useUnifiedTopology: true }
// );

app.get("/", (req, res) => {
	res.send("Hello world!");
});

app.get("/api", (req, res) => {
	MongoClient.connect(
		uri,
		{ useNewUrlParser: true },
		{ useUnifiedTopology: true },
		(err, db) => {
			if (err) console.log(err);
			var mdb = db.db("sample_analytics");
			var mysort = { account_id: 1 };
			mdb.collection("accounts")
				.find()
				.sort(mysort)
				.toArray(function (err, result) {
					if (err) console.log(err);
					console.log(result);
					res.json(result);
					db.close();
				});
			// perform actions on the collection object
			// const results = collection.find({}).toArray();
			// console.log(collection);
			// client.close();
		}
	);
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
