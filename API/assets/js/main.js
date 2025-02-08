$(document).ready(function () {

    // Event listener for the search button click
    $("#searchButton").click(function () {

        // Get the value of the search term input field
        let term = $("#searchTerm").val();
        
        if (term === "") {
            // Show prompt message if search term is empty
            $("#result").html("<p><strong>Please enter a search term.</strong></p>").show();
            return; // Exit the function if search term is empty
        }
        
        // Set up the AJAX request settings
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${term}`,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "92a89a044fmsh9b9c13c41bf30f3p121835jsn0b1809ce2968",
                "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com"
            }
        };

        $(document).ready(function () {
            // Reload the page when the logo section is clicked (to reset state)
            $(".logo-section-web, .logo-section-mobile").click(function () {
                location.reload();  // Reload the page to reset it to its original state
            });
        });

        // Send the AJAX request to fetch the data from the Urban Dictionary API
        $.ajax(settings).done(function (response) {
            if (response.list.length > 0) {
                // Display the result
                $("#result").html(`<p><strong>${response.list[0].word}</strong>: ${response.list[0].definition}</p>`).show();
            } else {
                // Display no definitions found message
                $("#result").html("<p><strong>No definitions found.</strong></p>").show();
            }
        }).fail(function () {
            // Display error message if the AJAX call fails
            $("#result").html("<p>Error fetching data. Please try again.</p>").show();
        });
    });

    // Optionally hide result when the search term is cleared
    $("#searchTerm").on('input', function () {
        if ($(this).val() === "") {
            $("#result").hide();  // Hide result if input is cleared
        }
    });
});
