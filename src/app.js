const express = require("express");
const path = require("path");
require("./db/conn");
const USERS = require("./models/usermessage")
const hbs = require("hbs");
const { registerPartials } = require("hbs");
const app = express();
const port = process.env.PORT || 3000;
// setting path
let connectdb = require("../src/db/conn");
connectdb()
const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");
//middleware 

// app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
// app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
// app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery")));
app.use('/css', express.static(__dirname + "../public/css"));
app.use('/js', express.static(__dirname + "../node_modules/bootstrap/dist/js"));
app.use('/jq', express.static(__dirname + "../node_modules/jquery"));
app.use('/img', express.static(__dirname + "../public/images"))

app.use(express.urlencoded({ extended: false }))

app.use(express.static(staticpath))
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath)


// using images 


app.use(express.static("images"));


app.get("/", (req, res) => {
    res.render("index");
})

app.get("/index", (req, res) => {
    res.render("index");
})

app.get("/course", (req, res) => {
    res.render("course");
})

app.get("/contact", (req, res) => {
    res.render("contact");
})

// app.get("/blog",(req,res)=>{
//     res.render("blog");
// })

app.get("/admission", (req, res) => {
    res.render("admission")
})

app.get("/about", (req, res) => {
    res.render("about")
})


app.post("/contact", async (req, res) => {
    try {
        // const password = req.body.Password;
        // const cpassword = req.body.ConfirmPassword;

        const email = req.body.Email;
        function isEmail(email) {
            var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            if (email !== "" && email.match(emailFormat)) {
                return true;
            }

            return false;
        }

        if (isEmail(email)) {
            const data = new USERS({
                name: req.body.name,
                email: req.body.email,
                course: req.body.course,
                message: req.body.message,

            });

            const registered = await data.save();
            res.status(201).render("index");
            console.log(registered);
            alert("Successfully Registered");
        } else {
            console.log("invalid credentials")
        }
    } catch (error) {
        res.status(400).send(error);
    }
});


app.listen(port, () => {
    console.log("server connected ...");
})
