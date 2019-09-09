const express = require("express");
const app = express();
const Sequelize = require("sequelize");

const connection = new Sequelize("user", "db", "pass", {
    host: "",
    dialect: "mysql",
    operatorsAliases: false
});

const User = connection.define("User", {
    uuid: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
        validate: {
            len: [3]
        }
    },
    bio: Sequelize.TEXT
});

const Post = connection.define("User", {
    userId: Sequelize.STRING,
    title: {
        type: Sequelize.STRING,
        validate: {
            len: [3]
        }
    },
});

const Comment = connection.define("Comment", {
    content: Sequelize.TEXT,
    post_id:Sequelize.INTEGER
});

Post.belongsTo(User, {as:'UserRef', foreginKey: 'userId'})
Post.hasMany(Comment, {as:'Comments', foreginKey: 'post_id'})
connection
    .sync({
        loggin: console.log
    })


app.get("/", function(req, res) {
    res.send("hello world");
});

app.listen(3000);
