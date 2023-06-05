//  #TITLE
//  #YEAR 
//  #IMDB_ID
//  #RANK
function apiCall(query) {
    return new Promise( async (resolve,reject) => {
        fetch(`https://search.imdbot.workers.dev/?q=${query}`)
            .then(async (res)=>{
                let data = await res.json();
                console.log(data)
                let movies = data.description;
                if( movies.length == 0 ){
                    reject("movie not found")
                }
                resolve(movies)
            })
            .catch(err=>{console.log(err)})
    })


}

export default apiCall;