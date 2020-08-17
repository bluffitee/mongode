const { MongoClient } = require("mongodb");
const express = require("express");
let PORT = process.env.PORT || 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const uri =
	"mongodb+srv://mongodb_master:mongodb-as-a-db@cluster0.q6dah.mongodb.net/";

const client = new MongoClient(
	uri,
	{ useNewUrlParser: true },
	{ useUnifiedTopology: true }
);

app.get("/", (request, result) => {
	result.send("Hello Mongo");
});

client.connect((err) => {
	const collection = client.db("sample_analytics").collection("accounts");
	// perform actions on the collection object
	// const results = collection.find({}).toArray();
	console.log(collection);
	client.close();
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
