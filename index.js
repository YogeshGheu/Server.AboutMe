import express from "express";
import "dotenv/config"


const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Server is Ready ...");
});

app.listen(port, () => {
	console.log(`AboutMe app listening on port ${port}`);
});
