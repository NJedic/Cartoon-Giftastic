// GLOBAL VARIABLES
// ==================================================

// Initial Array of cartoons
var topics = ["Thundercats", "Bob's Burgers", "Adventure Time", "Scooby Doo", "The Powerpuff Girls", "Rugrats", "Doug", "Animaniacs", "He Man and The Masters of the Universe", "Captain Planet", "Spongebob Squarepants", "Cow and Chicken", "Johnny Bravo", "Space Ghost", "Hey, Arnold!", "Steven Universe", "Recess", "Jem", "Courage the Cowardly Dog", "Muppet Babies"];


// FUNCTIONS
// ==================================================

// This function displays the gifs 
function displayGifs(numGifs) {


  var newCartoon = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newCartoon + "&limit=10&rating&api_key=dc6zaTOxFJmzC";

  // Creating an AJAX call for the specific cartoon button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
  		// console.log(response);
  	// Clear the div of the previous gifs
  	$("#cartoonz").empty();
		// Storing the image response data
  	var results = response.data
  	// Making a loop to sort through all of the images
 		for (var i = 0; i < results.length; i++){
 			// Making a div to hold the gifs and giving it the class of "gif"
	 		var gifsDiv = $("<div class='gif'>");
	 		// Making a variable to represent the rating info for each gif
	 		var rating = results[i].rating;
	 		// Making a <p> to hold and display the rating info
	 		var p = $("<p>").text("Rating: " + rating);
	 		// Making the gifImage an image
	 		var gifImage = $("<img class='gif'>");
	 		// Assigning attributes to the gifImage variable
	 		gifImage.attr({
        src: results[i].images.fixed_height_still.url,
        "data-state": "still",
        "data-still": results[i].images.fixed_height_still.url,
        "data-animate": results[i].images.fixed_height.url, 
      });
	 		//Appending the gif image to the gifsDiv
	 		gifsDiv.append(gifImage);
	 		// Appending the Rating to each gif
	 		gifsDiv.append(p);
	 		// Appending the gifs to the DOM
	  	$("#cartoonz").append(gifsDiv);  
  	}; 
  });
};

// This function for displays the cartoon buttons
function renderButtons() {

  // empty the cartoonButtons div prior to rendering new buttons
  $("#cartoonButtons").empty();
  
  // Loop through the array of cartoons, then generate buttons for each cartoon in the array
  for (var i = 0; i < topics.length; i++){
      // console.log(topics[i]);
      // create a button for each cartoon in the array
      var button = $("<button>");
      // Adding a class of cartoon to our button
      button.addClass("cartoon");
      // Adding a data-attribute
      button.attr("data-name", topics[i]);
      // Providing the initial button text
      button.text(topics[i]);
      // Adding the button to the cartoonButtons div
      $("#cartoonButtons").append(button);
  }
}

// This function handles events where a button is clicked
$("#submit").on("click", function(event) {
	// Prevents the page from refreshing on click 
  event.preventDefault();
  // Captures the input from the textbox
  var newCartoon = $("#cartoonInput").val().trim();
  // The cartoon from the textbox is then added to our array
  topics.push(newCartoon);
  // Calling renderButtons which handles the processing of our cartoon array
  renderButtons();
  // Clearing the input form after submit button is clicked
  $("#cartoonInput").val("");
});

// This function handles the animation of the gifs
function animateGifs(){
    // console.log("hi!");
  var state = $(this).attr("data-state");
  if (state == "still"){
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }

  else {
    $(this).attr("src", $(this).attr("data-still"));
     $(this).attr("data-state", "still");
  } 
};

// adding a click listener to all of the elements with a class of movie 
$(document).on("click", ".cartoon", displayGifs);
$(document).on("click", ".gif", animateGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();
animateGifs();