
// xsharawi was here
import {Movie} from './movie.js'
import apiCall from './api/api.js'
import * as handleFiles from './files/handlingFiles.js'
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import {v4 as uuid } from "uuid"
const rl = readline.createInterface({ input, output });
// usage let answer = await rl.question("propmt")

let movieList = handleFiles.readAFile('/movies.json') ;

if(movieList == undefined) movieList = []

let choice = 0;

while(choice != 7){

    console.log("*****************")
    console.log("Welcome to the movies list!!")
    console.log("*****************")
    console.log("Select an action: ")
    console.log("1) Add a new movie by hand")
    console.log("2) List all movies")
    console.log("3) Update a movies data")
    console.log("4) Delete a movie")
    console.log("5) Search and filter movies")
    console.log("6) Fetch a movies data and add it to files")
    console.log("7) Exit")
    console.log("*****************")

    choice = Number(await rl.question('Your choice: '));

    if( choice == 1 ){
        // Movie(id,title,rating,year,imdb_id,rank)
        let id = uuid();
        let title = await rl.question("enter the movies title: ")
        let rating = await rl.question("enter the movies rating: ")
        let year = await rl.question("enter the movies release year: ")
        let imdb_id =await rl.question("enter the movies imdb id if you know it: ")
        let rank = await rl.question("enter the movies rank: ")
        let mv = new Movie(id,title,rating,year,imdb_id,rank);
        console.log(title);
        console.log(mv);
        movieList.push(mv);
    }
    if( choice == 2 ){
        movieList.forEach(movie => {
            console.log("**************************************");
            console.log(`The movies id: ${movie.id}`)
            console.log(`The movies title: ${movie.title}`)
            console.log(`The movies rating: ${movie.rating}`)
            console.log(`The movies release year: ${movie.year}`)
            console.log(`The movies imdb_id: ${movie.imdb_id}`)
            console.log(`The movies rank: ${movie.rank}`)
            console.log("**************************************");
        });
    }
    if( choice == 3 ){
        movieList.forEach(movie => {
            console.log("**************************************");
            console.log(`The movies id: ${movie.id}`)
            console.log(`The movies title: ${movie.title}`)
            console.log(`The movies rating: ${movie.rating}`)
            console.log(`The movies release year: ${movie.year}`)
            console.log(`The movies imdb_id: ${movie.imdb_id}`)
            console.log(`The movies rank: ${movie.rank}`)
            console.log("**************************************");
        });

        let id =await rl.question("enter the movies id you'd like to update, (leave blank if you dont want to edit something already there): ")
        let title = await rl.question("enter the movies title: ")
        let rating = await rl.question("enter the movies rating: ")
        let year = await rl.question("enter the movies release year: ")
        let imdb_id =await rl.question("enter the movies imdb id if you know it: ")
        let rank = await rl.question("enter the movies rank: ")
        let mv = new Movie(id,title,rating,year,imdb_id,rank);
        
        let change = movieList.findIndex((element)=> element.id == id)
        if(change == -1){
            continue;
        }
        else{
            movieList[change] = mv;
        }

    }
    if( choice == 4 ){
        movieList.forEach(movie => {
            console.log("**************************************");
            console.log(`The movies id: ${movie.id}`)
            console.log(`The movies title: ${movie.title}`)
            console.log(`The movies rating: ${movie.rating}`)
            console.log(`The movies release year: ${movie.year}`)
            console.log(`The movies imdb_id: ${movie.imdb_id}`)
            console.log(`The movies rank: ${movie.rank}`)
            console.log("**************************************");
        });
        let id =await rl.question("enter the movies id you'd like to delete: ")
        let del = movieList.findIndex((element)=> element.id == id)
        if( del != -1 )
            movieList.splice(del,1)
    }
    if( choice == 5 ){
        let year = Number(await rl.question("enter the year which you'd like to search for movies in: "))
        let byYear = movieList.filter((element)=>element.year == year)
        if( byYear.length == 0 ){
            console.log('no movies were found in that year!');
        }
        else{
            byYear.forEach(movie => {
                console.log("**************************************");
                console.log(`The movies id: ${movie.id}`)
                console.log(`The movies title: ${movie.title}`)
                console.log(`The movies rating: ${movie.rating}`)
                console.log(`The movies release year: ${movie.year}`)
                console.log(`The movies imdb_id: ${movie.imdb_id}`)
                console.log(`The movies rank: ${movie.rank}`)
                console.log("**************************************");
            });
        }
    }
    if( choice == 6 ){
        let name = await rl.question("enter the name of the movie you'd like to search for: ")
        apiCall(name).then((moviesReturned)=>{
            moviesReturned.forEach((e)=>{
                console.log("**************************************");
                console.log(`The movies id: ${e["#IMDB_ID"]}`)
                console.log(`The movies title: ${e["#TITLE"]}`)
                console.log(`The movies release year: ${e["#YEAR"]}`)
                console.log(`The movies imdb_id: ${e["#IMDB_ID"]}`)
                console.log(`The movies rank: ${e["#RANK"]}`)
                console.log("**************************************");
                let id = e["#IMDB_ID"]
                let title = e["#TITLE"]
                let year = e["#TITLE"]
                let imdb_id = e["#IMDB_ID"]
                let rank = e["#RANK"]
                let rating = 0
                let mv = new Movie(id,title,rating,year,imdb_id,rank);
                movieList.push(mv);
            })
        })
        .catch((err)=>{console.log(err);})
    }
    if( choice == 7 ){
        console.log("GOODBYE THANKS FOR USING MY MOVIES APP!!!!");
        console.log("I HOPE YOU HAD A GREAT EXPERICNE");
    }
    handleFiles.writeToJSON('./movies.json',movieList)
}

rl.close();

