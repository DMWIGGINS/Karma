
function updateFavor(favorId, favorAsker, favorCompleter, favorPrice, status) {
    console.log("im in updateFavor!!");
    console.log("favorId " + favorId);
    console.log("favorAsker " + favorAsker);
    console.log("favorCompleter " + favorCompleter);
    console.log("favorPrice " + favorPrice);
    console.log("status " + status);
    var dataObject = {
        id: favorId,
        favor_status: status,
        favor_asker_id: favorAsker,
        favor_completer_id: favorCompleter,
        favor_price: favorPrice
    }
    console.log("dataObject: " + JSON.stringify(dataObject));
    // Send the POST request.
    $.ajax("/api/favorsdetail/", {
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
    var favorId = $("#favorid").attr('value');
    var favorAsker = $("#favoraskerid").attr('value');
    var favorPrice = $("#favorprice").attr('value');
    var favorDatetime = $("#favordatetime").attr('value');
    console.log("favorId " + favorId);
    console.log("favorAsker " + favorAsker);
    console.log("favorPrice " + favorPrice);
    console.log("favorDate " + favorDatetime);


    // ========================================================================================
    // When the pending button is clicked, update the row in the database to show pending status
    // ========================================================================================
    $(document).on('click', '#pendingBtn', function (event) {
        // Make sure to preventDefault on a submit event.
        console.log("im in the favorsdetail page");
        event.preventDefault();
        console.log("i clicked the pending button");
        // var favorId = $("#favorid").attr('value');
        // var favorAsker = $("#favoraskerid").attr('value');
        // var favorPrice = $("#favorprice").attr('value');
        var favorId = $(this).data("id");
        var favorAsker = $(this).data("asker-id");
        var favorPrice = $(this).data("favor-price");
        console.log("favorId " + favorId);
        console.log("favorAsker " + favorAsker);
        console.log("favorPrice " + favorPrice);
        console.log("favorDate " + favorDatetime);
        // updatePendingFavor(favorId);
        updateFavor(favorId, favorAsker, null, favorPrice, 'pending');
    });

    // ============================================================================================
    // When the complete button is clicked, update the row in the database to show completed status
    // ============================================================================================
    $(document).on('click', '#completedBtn', function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log("i clicked the complete button!!");
        // var favorId = $("#favorid").attr('value');
        // var favorAsker = $("#favoraskerid").attr('value');
        // var favorPrice = $("#favorprice").attr('value');
        // var favorCompleter = $(this).data("completerId");
        var favorId = $(this).data("id");
        var favorAsker = $(this).data("asker-id");
        var favorCompleter = $(this).data("completer-id");
        var favorPrice = $(this).data("favor-price");
        console.log("favorId " + favorId);
        console.log("favorAsker " + favorAsker);
        console.log("favorPrice " + favorPrice);
        // updateCompletedFavor(favorId);
        updateFavor(favorId, favorAsker, favorCompleter, favorPrice, 'completed');
    });
});