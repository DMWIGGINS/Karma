//Pipe to map the Database items to the handlebars.

// The Functions to get asked and given

function getPendingFavorRequests() {
    var ProfileId = "";
    var allPendingFavorsAsked = {
        favor_KarmaPrice: $("#pendingFavorAskedPrice").val().trim(),
        user_id: ProfileId,
        pendingRecent_FavorRequest: $("#pendingFavorAsk").val().trim(),
    };

    // Send the GET request.
    $.ajax("/api/favor/mostRecentAsked", {
        type: "GET",
        data: getPendingFavorRequests
    }).then(
        function () {

            // Reload the page to get the most recent ask
            location.reload();
        });
}
//where they are they said that they will complete, but it's still pending.
//favor_completerid
function getPendingRecentFavorGiven() {
    var ProfileId = "";
    var allPendingFavorAssigned = {
        favor_KarmaPrice: $("#pendingFavorGiveprice").val().trim(),
        user_id: ProfileId,
        mostRecent_FavorRequest: $("#pendingFavorGive").val().trim(),
    };

    // Send the POST request.
    $.ajax("/api/favor/mostRecentGiven", {
        type: "GET",
        data: MostRecentFavorGiven
    }).then(
        function () {

            // Reload the page to get the most recent favor completed.
            location.reload();
        });
}



/

function getUserFavorRequests() {
    var allPendingFavorsAsked = {
        favor_KarmaPrice: $("#pendingFavorAskedPrice").val().trim(),
        user_id: ProfileId,
        pendingRecent_FavorRequest: $("#pendingFavorAsk").val().trim(),
    };

    // Send the GET request.
    $.ajax("/api/favor/mostRecentAsked", {
        type: "GET",
        data: getPendingFavorRequests
    }).then(
        function () {

            // Reload the page to get the most recent ask
            location.reload();
        });
}

//=================================================
// On Page Load
//=================================================
$(document).ready(function () {

    getUserFavorRequests();

});