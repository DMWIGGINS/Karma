//=================================================
// Functions
//=================================================
function addFavor() {
    var favorAskerId = 1;
    var newFavor = {
        favor_name: $("#newFavorName").val().trim(),
        favor_desc: $("#newFavorDesc").val().trim(),
        favor_asker_id: favorAskerId,
        favor_price: $("#newFavorPrice").val().trim(),
        favor_date_time: $("#calendarSection").val().trim()
    };
    console.log("newFavor: " + JSON.stringify(newFavor));
    // Send the POST request.
    $.ajax("/api/favor/new", {
        type: "POST",
        data: newFavor
    }).then(
        function () {
            console.log("created the new favor");
            // Reload the page to get the updated list
            location.reload();
        });
}

function updateFavor(favorId) {
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


//=================================================
// On Page Load
//=================================================
$(document).ready(function () {
//========================================================================
// Binding flatpicker to the form so the calendar and date selector pop up
//========================================================================
    flatpickr("#calendarSection", {
        altInput: true,
        enableTime: true,
        dateFormat: "F j, Y h:i K",
        minDate: "today",
        maxDate: new Date().fp_incr(365)
    });

    // ========================================================================
    // When the submit button is clicked, a new row is added to the database
    // ========================================================================
    $(document).on('click', '#submitBtn', function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log("i clicked submit");
        addFavor();
    });

    // ========================================================================
    // When the update button is clicked, update the row in the database
    // ========================================================================
    $(document).on('click', '#updateBtn', function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log("i clicked update");
        var favorId = $(this).data("id");
        console.log("favorId " + favorId);
        updateFavor(favorId);
    });


});