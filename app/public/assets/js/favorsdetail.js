//=================================================
// Functions
//================================================
function pendingFavor() {
    console.log("im in updateFavor");
    console.log("favorId " + favorId);
    var favorCompleterId = 2;
    var dataObject = {
        id: favorId,
        favor_completer_id: favorCompleterId,
        favor_status: "pending"
    }
    console.log("dataObject: " + dataObject);
    // Send the POST request.
    $.ajax("/api/favor/" + favorId, {
        type: "PUT",
        data: dataObject
    }).then(
        function () {
            console.log("updated a status");
            // Reload the page to get the updated list
            location.reload();
        });
}

function completedFavor() {
    console.log("im in updateFavor");
    console.log("favorId " + favorId);
    var favorCompleterId = 2;
    var dataObject = {
        id: favorId,
        favor_completer_id: favorCompleterId,
        favor_status: "completed"
    }
    console.log("dataObject: " + dataObject);
    // Send the POST request.
    $.ajax("/api/favor/" + favorId, {
        type: "PUT",
        data: dataObject
    }).then(
        function () {
            console.log("updated a status");
            // Reload the page to get the updated list
            location.reload();
        });
}


//=================================================
// On Page Load
//=================================================
$(document).ready(function () {

// ========================================================================================
// When the pending button is clicked, update the row in the database to show pending status
// ========================================================================================
    $(document).on('click', '#pendingBtn', function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log("i changed to pending");
        var favorId = $(this).data("id");
        console.log("favorId " + favorId);
        pendingFavor(favorId);
    });

// ============================================================================================
// When the complete button is clicked, update the row in the database to show completed status
// ============================================================================================
    $(document).on('click', '#completedBtn', function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log("i changed to complete");
        var favorId = $(this).data("id");
        console.log("favorId " + favorId);
        completedFavor(favorId);
    });


});