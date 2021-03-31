// let movie = {
//     "Title":"Toy Story",
//     "Year":"1995",
//     "Rated":"G",
//     "Released":"22 Nov 1995",
//     "Runtime":"81 min",
//     "Genre":"Animation, Adventure, Comedy, Family, Fantasy",
//     "Director":"John Lasseter",
//     "Writer":"John Lasseter (original story by), Pete Docter (original story by), Andrew Stanton (original story by), Joe Ranft (original story by), Joss Whedon (screenplay by), Andrew Stanton (screenplay by), Joel Cohen (screenplay by), Alec Sokolow (screenplay by)",
//     "Actors":"Tom Hanks, Tim Allen, Don Rickles, Jim Varney",
//     "Plot":"A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
//     "Language":"English",
//     "Country":"USA",
//     "Awards":"Nominated for 3 Oscars. Another 27 wins & 20 nominations.",
//     "Poster":"https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg",
//     "Ratings":[
//         {
//             "Source":"Internet Movie Database",
//             "Value":"8.3/10"
//         },
//         {
//             "Source":"Rotten Tomatoes",
//             "Value":"100%"
//         },
//         {
//             "Source":"Metacritic",
//             "Value":"95/100"
//         }
//     ],
//     "Metascore":"95",
//     "imdbRating":"8.3",
//     "imdbVotes":"864,385",
//     "imdbID":"tt0114709",
//     "Type":"movie",
//     "DVD":"20 Mar 2001",
//     "BoxOffice":"N/A",
//     "Production":"Buena Vista",
//     "Website":"N/A",
//     "Response":"True"
// }

// var avgRate = 0;



// function display() {
//     // div frame in HTML
//     var i = document.createElement('img');
//     i.src = movie.Poster;
//     i.id = "curMovieImg"
//     i.className = "pic";
//     document.getElementById("frame").appendChild(i);

//     // div info in HTML
//     document.getElementById("curMovieTitle").innerHTML = ' ' + movie.Title;
//     document.getElementById("curMovieYear").innerHTML = ' ' + movie.Year;
//     document.getElementById("curMovieRate").innerHTML = ' ' + movie.Rated;
//     document.getElementById("curMovieRuntime").innerHTML = ' ' + movie.Runtime;
//     document.getElementById("curMoviePlot").innerHTML = ' ' + movie.Plot;

//     // div moreInfo in HTML
//     document.getElementById("curMovieGenre").innerHTML = ' ' + movie.Genre;
//     document.getElementById("curMovieDir").innerHTML = ' ' + movie.Director;
//     document.getElementById("curMovieAct").innerHTML = ' ' + movie.Actors;
//     document.getElementById("curMovieWtr").innerHTML = ' ' + movie.Writer;
//     document.getElementById("imdbR").innerHTML = ' ' + movie.imdbRating;
//     // div info in HTML

//     // div info in HTML

// }


$(function(){
    $(".rates").on('click',function() {
        let len = $(".rates").length
        
        let index = $(this).index() - 2
        // if($('.rates').eq(index).hasClass("rate-active")) {
        //     $('.rates').eq(index).removeClass("rate-active")
        // } else {
            
        // }
        for(let i=0;i<=len; i++) {
            $('.rates').eq(i).removeClass("rate-active")
        }
        $('.rates').eq(index).addClass("rate-active")
    })


    $("#commentsSunmit").click(function(){
        const comment = $("#comments").val();
        if(!comment) {
            alert("How do you think about this movie? Comment here!")
            return false
        }
        if(!$("#userId").val()) {
            alert("Please log in!")
            return false
        }
        $.post("/movie/addInfo",{
            comment,
            rate: getRate() + 1,
            id: $("#movieId").val()
        },(e) => {
            if(e.success) {
                window.location.reload()
            } else {
                alert(e.msg)
            }
        });
    })


})


function getRate() {
    let len = $(".rates").length
    let index = 0;
    for(let i=0;i<=len; i++) {
        if($('.rates').eq(i).hasClass("rate-active")) {
            index = i
        }
    }
    return index
}