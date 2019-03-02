$(document).ready(function() {

/*******************
 * Notes:  The giphy website doesn't seem to allow downloading of gifs
 * I believe all the code is correct but the download button is going to 
 * the image link and not downloading so it's not doing what it should.
 */



// List of classes for html
// form-control  buttonsList  images
// apiKey: T0s8H2m5E8LgKBd12fUn0RY63Wzo7iiT

var animals = ["dog", "cat", "mouse", "lion", "horse", "bird", "cheetah", "squirrel",
                "skunk", "snake", "giraffe", "tiger", "turtle", "deer", "koala", "zebra",
                "hamster", "rabbit", "chinchilla", "armadillo", "donkey", "antelope", "monkey",
                "ferret", "whale", "shark", "bear", "polar bear", "sloth", "gecko", "vulture",
                "elephant"];


var getAnimal;

//variable for increasing gifs per click.
var n = 10;

//display animal gifs fuction
function displayAnimalInfo() {

    $(".images").empty();

    // Grabbing and storing the data-animal property value from the button
    getAnimal = $(this).attr("data-animal");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
    getAnimal + "&api_key=T0s8H2m5E8LgKBd12fUn0RY63Wzo7iiT&limit=10";

    //ajax request from queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response) {

        console.log(queryURL);
        console.log(response);

        var results = response.data;
        for(var i = 0; i < 10; i++) {

            //create a new div tag
            var animalDiv = $("<div>");
            animalDiv.addClass("mx-1 my-3");

            // create a new paragraph tag that holds the results and rating of image
            var p = $("<p>").text(results[i].title);
            var pB = $("<p>").text("Rating: " + results[i].rating);

            //create new image
            var animalImage = $("<img>");

            animalImage.addClass("gif border border-secondary");

            //add attribute of source of image
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");

            //adding a button to download image (But the website doesn't allow it!)
            var animalLink = $("<a href='" + results[i].images.original.url + "'>").text("download");
            animalLink.attr("download");
            animalLink.addClass("btn btn-outline-secondary downloadbtn");
            
   
            //adding paragraph and image tags to the animal div
            animalDiv.append(p);
            animalDiv.append(animalImage);
            animalDiv.append(pB);
            animalDiv.append(animalLink);

            $(".images").prepend(animalDiv);
        }
        n = 10;
    });

}

//add 10 more gifs of the same type
function getMore() {

    event.preventDefault();

    // Constructing a queryURL using the animal name
    var queryTwoURL = "https://api.giphy.com/v1/gifs/search?q=" + 
    getAnimal + "&api_key=T0s8H2m5E8LgKBd12fUn0RY63Wzo7iiT&limit=" + (n + 10);

    //ajax request from queryURL
    $.ajax({
        url: queryTwoURL,
        method: "GET"
    })

    .then(function(responseTwo) {

        console.log(queryTwoURL);
        console.log(responseTwo);

        var resultsTwo = responseTwo.data;
        for(var i = n; i < (n + 10); i++) {

            //create a new div tag
            var animalDiv = $("<div>");
            animalDiv.addClass("mx-1 my-3");

            // create a new paragraph tag that holds the results and rating of image
            var p = $("<p>").text(resultsTwo[i].title);
            var pB = $("<p>").text("Rating: " + resultsTwo[i].rating);

            //create new image
            var animalImage = $("<img>");

            animalImage.addClass("gif border border-secondary");

            //add attribute of source of image
            animalImage.attr("src", resultsTwo[i].images.fixed_height_still.url);
            animalImage.attr("data-still", resultsTwo[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", resultsTwo[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");

           //adding a button to download image (But the website doesn't allow it!)
            var animalLink = $("<a href='" + resultsTwo[i].images.original.url + "'>").text("download");
            animalLink.attr("download");
            animalLink.addClass("btn btn-outline-secondary downloadbtn");
            
    
            //adding paragraph and image tags to the animal div
            animalDiv.append(p);
            animalDiv.append(animalImage);
            animalDiv.append(pB);
            animalDiv.append(animalLink);

            $(".images").prepend(animalDiv);



        }

        //increase n by 10
        n += 10;

    });

};




//start and stop gif
function gifRender() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
};

// start by populating some initial buttons
function renderButtons() {

    //clear all buttons initially
    $(".buttonsList").empty();

    //for loop to put all the animals in array into buttons
    for (var i = 0; i < animals.length; i++) {

        //variable a is assigned to a new button jquery
        var a = $("<button>");

        //class is added to variable a
        a.addClass("btn btn-outline-info animal");

        //attribute of data-name is added to each animal's name from array
        a.attr("data-animal", animals[i]);

        //the text of the animals name from array is put on button to show
        a.text(animals[i]);

        //each new button is appended 
        $(".buttonsList").append(a);
    }
}

// onclick function for each animal button only if not already in array
$("#addAnimal").on("click", function(event) {

    event.preventDefault();

    //grabs the input from the textbox
    var newAnimal = $("#inputText").val().trim();

    //only push new animal to array if not already in
    if (animals.indexOf(newAnimal) === -1 && newAnimal !== "") {

        //add the text from textbox to array
        animals.push(newAnimal);
        
        //call render button function
        renderButtons();
    }
});


// adding an on click listener to all elements with a class of animal
$(document).on("click", ".animal", displayAnimalInfo);

$(document).on("click", ".gif", gifRender);

$(document).on("click", "#get-more", getMore);

renderButtons();




//end of document ready
});