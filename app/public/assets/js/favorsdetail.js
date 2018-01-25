function updateFavor(favorId, favorAsker, favorPrice, status) {
   
    var dataObject = {
        id: favorId,
        favor_status: status,
        favor_asker_id: favorAsker,
        favor_price: favorPrice
    }
    
    // Send the POST request.
    $.ajax("/api/favorsdetail/" + favorId, {
        type: "PUT",
        data: dataObject
    }).then(
        function () {
            
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
        event.preventDefault();
        var favorId = $(this).data("id");
        var favorAsker = $(this).data("favor_asker_id");
        var favorPrice = $(this).data("favor_price");
        updateFavor(favorId, favorAsker, favorPrice, 'pending');
    });

// ============================================================================================
// When the complete button is clicked, update the row in the database to show completed status
// ============================================================================================
    $(document).on('click', '#completedBtn', function (event) {
        event.preventDefault();
        var favorId = $(this).data("id");
        var favorAsker = $(this).data("favor_asker_id");
        var favorPrice = $(this).data("favor_price");
        updateFavor(favorId, favorAsker, favorPrice, 'completed');
    });
});

