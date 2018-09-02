
    //Array for searched reactions to be added
    var reactions = [];
    
        //Function with AJAX call to GIPHY; Q parameterc for API link set to search term, limit 10 results
      //Create div with respective still and animate image sources with "data-state", "data-still" and "data-animate" attributes
         function displayReactions() {
    
        var x = $(this).data("search");
        console.log(x);
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";
    
        console.log(queryURL);
    
        $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
                var results = response.data;
                console.log(results);
                for (var i = 0; i < results.length; i++) {
                
                var reactionDiv = $("<div class='col-md-4'>");
    
                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var reactionImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
    
                reactionImage.attr("src", staticSrc);
                reactionImage.addClass("reactionGiphy");
                reactionImage.attr("data-state", "still");
                reactionImage.attr("data-still", staticSrc);
                reactionImage.attr("data-animate", defaultAnimatedSrc);
                reactionDiv.append(p);
                reactionDiv.append(reactionImage);
                $("#reactionArea").prepend(reactionDiv);
    
            }
        });
    }
    
      //Submit button click event takes search term from form input, trims and pushes to reactions array, displays button
        $("#addReaction").on("click", function(event) {
            event.preventDefault();
            var newReaction = $("#reactionInput").val().trim();
            reactions.push(newReaction);
            console.log(reactions);
            $("#reactionInput").val('');
            displayButtons();
          });
    
      //Function iterates through reactions array to display button with array values in "reactionButtons" section of HTML
        function displayButtons() {
        $("#reactionButtons").empty();
        for (var i = 0; i < reactions.length; i++) {
          var a = $('<button class="btn btn-secondary">');
          a.attr("id", "reaction");
          a.attr("data-search", reactions[i]);
          a.text(reactions[i]);
          $("#reactionButtons").append(a);
        }
      }
    
    
      displayButtons();
    
      //Click event on button with id of "reaction" executes displayReactions function
      $(document).on("click", "#reaction", displayReactions);
    
      //Click event on gifs with class of "reactionGiphy" executes pausePlayGifs function
      $(document).on("click", ".reactionGiphy", pausePlayGifs);
    
      //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
      function pausePlayGifs() {
           var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    }
    
