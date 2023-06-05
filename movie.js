
//  #TITLE
//  #YEAR 
//  #IMDB_ID
//  #RANK

class Movie{
    constructor(id,title,rating,year,imdb_id,rank){
        this.id = id;
        this.title = title;
        this.rating = rating;
        this.year = year;
        this.imdb_id = imdb_id;
        this.rank = rank;
    }
}

export {Movie}