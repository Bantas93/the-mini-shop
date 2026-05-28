const express = require("express");
const router = require("./routes");
const app = express();
const port = 3000;
const session = require("express-session");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "12345",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24, secure: false, sameSite: true },
  }),
);

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
