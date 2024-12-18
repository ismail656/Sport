//import express module 
const express = require("express");

// import body-parser module
const bodyParser = require("body-parser");

// import mongoose module
const mongoose = require("mongoose");

// import bcrypt module
const bcrypt = require("bcrypt");

// import jsonwebtoken module
const jwt = require('jsonwebtoken');

// import express-session module
const session = require('express-session');

// import multer module
const multer = require('multer');

// import path module (interne)
const path = require('path');

// import axios module
const axios = require('axios');

// connect app to database
mongoose.connect('mongodb://127.0.0.1:27017/la7thaDB');


//create an aplication
const app = express();

//configuration
app.use(bodyParser.json()); //send JSON response
app.use(bodyParser.urlencoded({ extended: true })) // get Object From request

const secretKey = 'croco23';
app.use(session({
    secret: secretKey,
}));

// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

//config du path qui meme vers dossier images

app.use('/avatars', express.static(path.join('backend/images')))


// Security 
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
// Multer Config
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});

//Models Importation
const Match = require("./models/match");
const Player = require("./models/player");
const Team = require("./models/team")
const User = require("./models/user");
const { log } = require("util");

let allMatches = [
    { id: 1, teamOne: "FCB", teamTwo: "RMD", scoreOne: 1, scoreTwo: 2 },
    { id: 2, teamOne: "JUV", teamTwo: "MNC", scoreOne: 6, scoreTwo: 0 },
    { id: 3, teamOne: "BAYERNe", teamTwo: "MNU", scoreOne: 0, scoreTwo: 0 },
    { id: 4, teamOne: "Ahli", teamTwo: "Zamalik", scoreOne: 3, scoreTwo: 3 }
];

//Test 1
let teams = [
    { id: 1, name: "FCB", owner: "Ali", stadium: "Radess" },
    { id: 2, name: "RMD", owner: "Salah", stadium: "manzah" },
    { id: 3, name: "JUV", owner: "nasser", stadium: "Zouiten" },
    { id: 4, name: "BRN", owner: "Foued", stadium: "Municipale" },
    { id: 5, name: "MNC", owner: "Mounir", stadium: "Radess" },
    { id: 6, name: "MNU", owner: "Mannoubi", stadium: "Mhiri" }
];

app.post('/imc',
    (req, res) => {
        let imc = req.body.poids / ((req.body.taille / 100) * (req.body.taille / 100))
        let msg = "obésité ***"
        if (imc < 16.5) {
            msg = "maigreur extraime"
        } else if (16.5 <= imc && imc < 18.5) {
            msg = "maigreur"
        }
        else if (18.5 <= imc && imc < 25) {
            msg = "Corpulance Normale"
        } else if (25 <= imc && imc < 30) {
            msg = "Obésité"
        }
        else if (30 <= imc && imc < 35) {
            msg = "Obésité Modéré"
        } else if (35 <= imc && imc < 40) {
            msg = "Obésite sévére"
        }
        res.json({ msg: `${msg} -- ${imc}` })
    })

//1- Busenis Logic : Search Team By Name 
app.get("/teams/nm/:nm", (req, res) => {
    let teamName = req.params.nm;
    res.json({ teamFinded: teams.find(obj => { return obj.name == teamName }) })
});

//2- Busenis Logic : Delete All Team
app.delete("/teams", (req, res) => {
    teams = [];
    console.log(teams);
    res.json({ isDeleted: true });
});

//2- Busenis Logic : Delete All Team
app.delete("/teams/:id", (req, res) => {
    let id = req.params.id;
    Team.deleteOne({ _id: id }).then((deleteResponse) => {
        console.log("here result after delete : ", deleteResponse)
        deleteResponse.deletedCount ? res.json({ isDeleted: true }) : res.json({ isDeleted: false });
    })
});

app.get("/teams/:id", (req, res) => {
    console.log("here intoBL : get team by ID");
    let id = req.params.id;
    Team.findOne({ _id: id }).then((doc) => {
        res.json({ team: doc });
    })
})

//3- Busenis Logic : Get All Team
app.get("/teams", (req, res) => {
    Team.find().then((docs) => {
        res.json({ teams: docs });
    })
});

//4- Busenis Logic : add Team
app.post("/teams", (req, res) => {
    let team = new Team(req.body);
    team.save();
    res.json({ isAdded: true });

});


//5- Busenis Logic : Edit Team
app.put("/teams", (req, res) => {
    Team.updateOne({ _id: req.body._id }, req.body).then((updatedResponse) => {
        console.log("Her is response after update :", updatedResponse)
        updatedResponse.nModified ?
            res.json({ isEdit: true }) :
            res.json({ isEdit: false });
    })
});

//6- Busenis Logic : Search Team By Stadium
app.get("/teams/st/:st", (req, res) => {
    let teamStadium = req.params.st;
    console.log(teamStadium);
    res.json({ teamFinded: teams.find(obj => { return obj.stadium == teamStadium }) })
});


//Test 2 
let users = [
    { id: 1, frstName: "Azer", lstName: "Mejri", email: "azer@gmail.com", pwd: "123456az" },
    { id: 2, frstName: "Ghassen", lstName: "Manai", email: "ghassen", pwd: "654321gd" },
    { id: 3, frstName: "Ahmed", lstName: "Hammemi", email: "ahmed", pwd: "ah123456" },
    { id: 4, frstName: "Bacem", lstName: "Arfaoui", email: "bacem", pwd: "b123456c" },
];

//1- signup bl
app.post("/users/signup", multer({ storage: storageConfig }).single("img"), (req, res) => {
    console.log("here intoBL : objet reçu =", req.body);
    bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
        console.log("here cryptedPwd", cryptedPwd);
        req.body.pwd = cryptedPwd;
        let protocol = req.protocol;
        let host = req.get("host");
        req.body.avatar = `${protocol}://${host}/avatars/${req.file.filename}`;
        let user = new User(req.body);
        user.save((err, doc) => {
            console.log("here err", err);
            console.log("here doc", doc);
            if (err) {
                if (err.errors.email) {
                    res.json({ msg: 0 });
                }
            } else {
                res.json({ msg: 1 });
            }
        })

    })
    // User.findOne({ email: req.body.email }).then(
    //     (doc) => {
    //         if (doc) {
    //             res.json({ msg: "Eroor : email Existe !!!" })
    //         } else {
    //             bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
    //                 console.log("here cryptedPwd", cryptedPwd);
    //                 req.body.pwd = cryptedPwd;
    //                 let user = new User(req.body);
    //                 user.save((err, doc) => {
    //                     console.log("here err", err);
    //                     console.log("here doc", doc);
    //                     err ?
    //                         res.json({ isAdded: false }) :
    //                         res.json({ isAdded: true });
    //                 })

    //             })
    //         }
    //     }
    // )

});



//BL login
//0-check email - 1-checkpwd -- 2-welcome
app.post("/users/login", (req, res) => {
    console.log("here intoBL Login: objet reçu =", req.body);
    let user;
    //search User by email
    User.findOne({ email: req.body.email })
        .then((doc) => {
            if (!doc) {
                //User email is not found
                res.json({ msg: "0" });
            } else {
                //User is found by email
                //Compare Crypted PWD with req.body.pwd
                user = doc;
                return bcrypt.compare(req.body.pwd, doc.pwd);
            }
        })
        //get the result of bcrypt.compare
        .then((pwdResult) => {
            console.log("Her PWD Result : ", pwdResult);
            if (!pwdResult) {
                //pwd and crypted pwd are not equal
                res.json({ msg: "1" });
            } else {
                //send respense : welcom
                let userToSend = {
                    fName: user.firstName,
                    lName: user.lastName,
                    role: user.role,
                    id: user._id
                };
                const token = jwt.sign(userToSend, secretKey, { expiresIn: "1h" });
                res.json({
                    msg: "2",
                    token: token
                });
            }
        })

});




//business Logic : all matches
app.get("/matches", (req, res) => {
    console.log("here intoBL : get all matches");
    Match.find().then((docs) => {
        res.json({ matches: docs });
    })
})

//business Logic : match by ID
app.get("/matches/:id", (req, res) => {
    console.log("here intoBL : get matche by ID");
    let id = req.params.id;
    Match.findOne({ _id: id }).then((doc) => {
        res.json({ match: doc });
    })
})

//business Logic : match by score
app.get("/matches/search/:score", (req, res) => {
    console.log("here intoBL : get matche by ID");
    let scoreToSearch = req.params.score;
    let matchesFinded = [];
    if (scoreToSearch != "") {
        matchesFinded = allMatches.filter((obj) => {
            return (obj.scoreOne == Number(scoreToSearch) ||
                obj.scoreTwo == Number(scoreToSearch));
        });
    }
    res.json({ matche: matchesFinded });
})

//business Logic : match by ID
app.delete("/matches/:id", (req, res) => {
    console.log("here intoBL : delete matche by ID");
    let id = req.params.id;
    Match.deleteOne({ _id: id }).then((deleteResponse) => {
        console.log("here result after delete : ", deleteResponse)
        deleteResponse.deletedCount ? res.json({ isDeleted: true }) : res.json({ isDeleted: false });
    })
    // res.json({ siDeleted: response });
})

//business Logic : add match
app.post("/matches", (req, res) => {
    console.log("here intoBL : objet reçu =", req.body);
    let match = new Match(req.body);
    match.save();
    res.json({ isAdded: true });
})

//business Logic : match by ID
app.put("/matches", (req, res) => {
    console.log("here intoBL : update matche by ID");
    Match.updateOne({ _id: req.body._id }, req.body).then((updatedResponse) => {
        console.log("Her is response after update :", updatedResponse)
        updatedResponse.nModified ?
            res.json({ isEdit: true }) :
            res.json({ isEdit: false });
    })
})


// business logic related To players :
//business Logic : all players
app.get("/players", (req, res) => {
    Player.find().then((docs) => {
        res.json({ players: docs });
    })
})

//business Logic : gte player by id
app.get("/players/:id", (req, res) => {
    let id = req.params.id;
    Player.findOne({ _id: id }).then((doc) => {
        res.json({ player: doc });
    })
})

//business Logic : add player
app.post("/players", multer({ storage: storageConfig }).single("img"), (req, res) => {
    try {
        Team.findById(req.body.teamId).then((team) => {
            if (!team) {
                return res.status(404).json({ message: "Team not found" });
            }
            if (req.file) {
                let protocol = req.protocol;
                let host = req.get("host");
                req.body.avatar = `${protocol}://${host}/avatars/${req.file.filename}`;
            }
            const player = new Player({
                name: req.body.name,
                nbr: req.body.nbr,
                age: req.body.age,
                position: req.body.position,
                teamId: team._id,
                avatar: req.body.avatar
            });
            player.save((err, doc) => {
                if (doc) {
                    team.players.push(player);
                    team.save();
                    res.status(201).json(player);
                }
            });

        })
    } catch (error) {
        return res.json({ message: `message: Error !! : ${error}` })
    }
    // let player = new Player(req.body);
    // player.save();
    // res.json({ isAdded: true });
})

//business Logic : delete player by id
app.delete("/players/:id", (req, res) => {
    console.log("here intoBL : delete player by ID");
    let id = req.params.id;
    Player.deleteOne({ _id: id }).then((deleteResponse) => {
        console.log("here result after delete : ", deleteResponse)
        deleteResponse.deletedCount ? res.json({ isDeleted: true }) : res.json({ isDeleted: false });
    })
})



//business Logic : edit player by id
app.put("/players", multer({ storage: storageConfig }).single("img"), (req, res) => {
    Team.findById(req.body.teamId).then((team) => {
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }
        if (req.file) {
            let protocol = req.protocol;
            let host = req.get("host");
            req.body.avatar = `${protocol}://${host}/avatars/${req.file.filename}`;
        }
        const player = {
            name: req.body.name,
            nbr: req.body.nbr,
            age: req.body.age,
            position: req.body.position,
            teamId: team._id,
            avatar: req.body.avatar }
            console.log(req.body.id);
        Player.updateOne({ _id: req.body.id }, player).then((updatedResponse) => {
            console.log("Her is response after update :", updatedResponse)
            updatedResponse.nModified ?
                res.json({ isEdit: true }) :
                res.json({ isEdit: false });
                
        })
    })
})

// weather search
app.post("/weather", (req, res) => {
    console.log("this is city", req.body);
    let key = "6d3b47bcd18186591e697b8731c32acc"
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.searchWeather}&appid=${key}`
    axios.get(apiURL).then(
        (response) => {
            console.log("here response from API", response.data);
        }

    )
    //    let result =  {
    //     temperature: this.response.data.main.temp
    //     : this.response.data.main.
    //    }    
})


//rendre l'application app importable dans d'autres fichier .ts
module.exports = app;