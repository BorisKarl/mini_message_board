const express = require("express");
const path = require("node:path");
const app = express();

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const links = [
  { href: "/", text: "Home" },
  { href: "new", text: "New" },
];

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];
  

app.get("/", (req, res) => {
  res.render("index", { 
    links: links,
    title: "Mini Messageboard", 
    messages: messages 
  });
});

app.get("/new", (req, res) => {
  res.render("new", { links: links});
});

app.post("/new", (req, res) => {
  const { text, user } = req.body;
  messages.push({ 
    text: text, 
    user: user, 
    added: new Date() 
  });
  res.redirect("/");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
