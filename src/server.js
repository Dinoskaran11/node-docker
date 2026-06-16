import express from 'express';
import dotenv from 'dotenv';
import basicAuth from 'basic-auth';

dotenv.config();

const app = express();

app.get("/", (req,res) => {
    res.send("Hello World!");
});

app.get("/secret", (req, res) => {
  const user = basicAuth(req);

  if (
    !user ||
    user.name !== process.env.USERNAME ||
    user.pass !== process.env.PASSWORD
  ) {
    res.set("WWW-Authenticate", 'Basic realm="Secret Area"');

    return res.status(401).send("Unauthorized");
  }

  res.send(process.env.SECRET_MESSAGE);
});


app.listen(process.env.PORT || 3000, () =>{
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});