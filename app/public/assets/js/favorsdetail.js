//=========================================================================================
// updatePendingFavor changes the status of the favor from active to pending
// indicating that the button has been clicked because a user has signed up to do the favor
//=========================================================================================

// function updatePendingFavor(favorId) {
//     console.log("im in updateFavor");
//     console.log("favorId " + favorId);
//     var favorCompleterId = 2;
//     var dataObject = {
//         id: favorId,
//         favor_completer_id: favorCompleterId,
//         favor_status: "pending"
//     }
//     console.log("dataObject: " + dataObject);
//     // Send the POST request.
//     $.ajax("/api/favorsdetail/" + favorId, {
//         type: "PUT",
//         data: dataObject
//     }).then(
//         function () {
//             console.log("updated a status");
//             // Reload the page to get the updated list
//             location.reload();
//         });
// }

//==================================================================================
// updateCompletedFavor changes the staus of the favor from pending to complete
// indicating that the button has been clicked because the favor has been completed
// =================================================================================


// function updateCompletedFavor(favorId) {
//     console.log("im in updateFavor");
//     console.log("favorId " + favorId);
//     var favorCompleterId = 2;
   
//     var dataObject = {
//         id: favorId,
//         favor_completer_id: favorCompleterId,
//         favor_status: "completed"
//     }
//     console.log("dataObject: " + dataObject);
//     // Send the POST request.
//     $.ajax("/api/favorsdetail/" + favorId, {
//         type: "PUT",
//         data: dataObject
//     }).then(
//         function () {
//             console.log("updated a status");
//             // Reload the page to get the updated list
//             location.reload();
//         });
// }


function updateFavor(favorId, favorAsker, favorPrice, status) {
    console.log("im in updateFavor!!");
    console.log("favorId " + favorId);
    console.log("status " + status);
    var dataObject = {
        id: favorId,
        favor_status: status,
        favor_asker_id: favorAsker,
        favor_price: favorPrice
    }
    console.log("dataObject: " + dataObject);
    // Send the POST request.
    $.ajax("/api/favorsdetail/" + favorId, {
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
        console.log("i clicked the pending button");
        var favorId = $(this).data("id");
        var favorAsker = $(this).data("favor_asker_id");
        var favorPrice = $(this).data("favor_price");
        console.log("favorId " + favorId);
        console.log("favorAsker " + favorId);
        console.log("favorPrice " + favorId);
        // updatePendingFavor(favorId);
        updateFavor(favorId, favorAsker, favorPrice, 'pending');
    });

// ============================================================================================
// When the complete button is clicked, update the row in the database to show completed status
// ============================================================================================
    $(document).on('click', '#completedBtn', function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log("i clicked the complete buttion!!");
        var favorId = $(this).data("id");
        var favorAsker = $(this).data("favor_asker_id");
        var favorPrice = $(this).data("favor_price");
        console.log("favorId " + favorId);
        console.log("favorAsker " + favorId);
        console.log("favorPrice " + favorId);
        // updateCompletedFavor(favorId);
        updateFavor(favorId, favorAsker, favorPrice, 'completed');
    });
});