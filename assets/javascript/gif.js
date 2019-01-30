$(document).ready(function () {

    var topics = [];


    function displayInfo() {

        var feel = $(this).data("search");
        console.log(feel);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + feel + "&api_key=bHTJ7xiMk2Qs1I8PRd2sst2o7MR1qlsi";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .done(function (response) {
                var results = response.data;
                console.log(response);
                console.log(results);

                for (var i = 0; i < results.length; i++) {

                   

                    var rating = results[i].rating.toUpperCase();
                    var gifDiv = $("<div class='col-md-4'>");

                    var defaultSrc = results[i].images.fixed_height.url;
                    var staticSrc = results[i].images.fixed_height_still.url;
                    var exoticAnimalImage = $("<img>");
                    var p = $("<p>").text("exoticAnimal: " + Exotic + " |" + "  Rating: " + rating);

                    exoticAnimalImage.attr("src", staticSrc);
                    exoticAnimalImage.attr("data-still", staticSrc);
                    exoticAnimalImage.attr("data-animate", defaultSrc);
                    exoticAnimalImage.attr("data-state", "still");
                    exoticAnimalImage.addClass("exoticAnimalGiphy");

                    gifDiv.append(p);
                    gifDiv.append(exoticAnimalImage);
                    $("#gifArea").prepend(gifDiv);


                }
            });
    }

    $("#addExotic").on("click", function (event) {
        event.preventDefault();
        var newexoticAnimal = $("#exoticAnimalInput").val().trim();
        topics.push(newexoticAnimal);
        console.log(topics);
        $("#exoticAnimalInput").val('');
        displayButtons();
    });

    function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $('<button class="btn btn-primary">');
            a.addClass("newButton");
            a.attr("id", "exotic");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#myButtons").append(a);
        }
    }


    displayButtons();

    $(document).on("click", "#exotic", displayInfo);

    $(document).on("click", ".exoticAnimalGiphy", pausePlayGifs);

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

});
