var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootarpita1",
    database: "top_songsDB"
});

connection.connect(err => {
    if (err) throw err;
    console.log(`connected on port ${connection.threadId}`)
    initialPrompts()
});

function initialPrompts() {
    inquirer.prompt([
        {
            name: "action",
            message: "what do you want to do?",
            type: "list",
            choices: [
                "ARTIST SEARCH",
                "MULTI SEARCH",
                "RANGE SEARCH",
                "SONG SEARCH",
                "EXIT"
            ]
        }
    ]).then(answer => {
        switch (answer.action) {
            case "ARTIST SEARCH":
                artistSearch();
                break;
            case "MULTI SEARCH":
                multiSearch();
                break;
            case "RANGE SEARCH":
                rangeSearch();
                break;
            case "SONG SEARCH":
                songSearch();
                break;
            default:
                connection.end()
                process.exit()
        }
    })
}

//artist search
function artistSearch() {
    inquirer.prompt([{
        message: "Which artist are you looking for?",
        name: "artist", 
    }]).then(answer => {
        connection.query(
            'SELECT position, artist, song, year FROM top5000 WHERE ?', 
            {artist: answer.artist},
            (err, results) =>{
            if (err)throw err
            console.table(results)
            initialPrompts()
        })
    })
}

//A query that returns all artists who appear within the top 5000 more than once
function multiSearch() {
    console.log("searching multisearch")
    initialPrompts()

}

//Aquery that returns all data contained within a specific range
function rangeSearch() {
    console.log("searching range");
    initialPrompts()
}

function songSearch() {
    console.log("searching song");
    initialPrompts()
}