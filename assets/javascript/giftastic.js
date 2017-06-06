// Initial Array of cartoons
var topics = ["Thundercats", "Bob's Burgers", "Adventure Time", "Scooby Doo", "The Powerpuff Girls", "Rugrats", "Doug", "Animaniacs", "He Man and The Masters of the Universe", "Captain Planet", "Spongebob Squarepants", "Cow and Chicken", "Johnny Bravo", "Space Ghost", "Hey, Arnold!", "Steven Universe", "Recess", "Jem", "Courage the Cowardly Dog"];

// functions to display the gifs and rating info
function displayGifs(numGifs) {


  var newCartoon = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + newCartoon + "&limit=10&rating&api_key=dc6zaTOxFJmzC";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
  		console.log(response);
  	
  	// Clear the div of the previous gifs
  	$("#cartoonz").empty();

  	// Storing the image response data
  	var images = response.source_post_url;
  	console.log(images);
  	$("#cartoonz").html(images);
  	// Creating a loop to run through the array and display the images
  	// for (var j = 0; j < numGifs; j++){
  		
  	// }

  });

}

//Function for displaying movie data
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

// This function handles events where one button is clicked
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

//
$(document).on("click", ".cartoon", displayGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();
