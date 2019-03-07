$(document).ready(function() {

// array of animals 
  var animals = [ "lion", "tiger", "whale", "elephant", "bear", "rhinoceros",
   "hyena" , "gorilla" , "horse" , "jaguar"
  ];

  // function creating empty buttons to add to the page
  function createButton(animals, type, newButton) {

    // creating an empty container for the new buttons
    $(newButton).empty();
    

    // going through the animals array[terms] to make into buttons 
    for (var i = 0; i < animals.length; i++) {
      // creating emptyButton button
      var emptyButton = $("<button>");
      // giving emptyButton class name 
      emptyButton.addClass(type);
      // setting the data type property to the name in the array because than it knows what to search
      emptyButton.attr("data-type", animals[i]);
      // the term in the buttom
      emptyButton.text(animals[i]);
      // placing the buttons on newButton 
      $(newButton).append(emptyButton);
    }

  }

// $(".animal-button").click(fuction(){}
  $(document).on("click", ".animal-button", function() {
    $("#animals").empty();
    $(".animal-button").removeClass("active");
    $(this).addClass("active");
    // grabbing whatever the button is saying
    var mammals = $(this).attr("data-type");
    
    // "http://api.giphy.com/v1/gifs/search?q="; + my api key
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + mammals + "&api_key=afWa9kfFJFzOG95aNGoohTRihsO53601&limit=10";
  // AJAX call based on parameters set
 $.ajax({
      url: queryURL,
      method: "GET"
 })
   .then(function(giphy) {
        var results = giphy.data;

      for (var i = 0; i < results.length; i++) {
        var giphyDiv = $("<div class=\"animal-item\">");

        var rating = results[i].rating;

        var pRating = $("<pRating>").text("Rating: " + rating);
 // Setting variables for the URLs for stills and animations
        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

        var image = $("<img>");
        image.attr("src", still);
        image.attr("data-still", still);
        image.attr("data-animate", animated);
        image.attr("data-state", "still");
        image.addClass("animal-image");

          giphyDiv.append(pRating);
          giphyDiv.append(image);

          $("#animals").append(giphyDiv);
        }
      });
  });
  

  $(document).on("click", ".animal-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    var addAnimal = $("input").eq(0).val();

    if (addAnimal.length > 2) {
      animals.push(addAnimal);
    }

    createButton(animals, "animal-button", "#animal-buttons");

  });

  createButton(animals, "animal-button", "#animal-buttons");
});
