//=================================================
// Functions
//=================================================
function addFavor() {
var favorAskerId = 1;
    var newFavor = {
        favor_name: $("#newFavorName").val().trim(),
        favor_desc: $("#newFavorDesc").val().trim(),
        favor_asker_id: favorAskerId,
        favor_price: $("#newFavorPrice").val().trim()
    };
    console.log("newFavor: " + JSON.stringify(newFavor));
    // Send the POST request.
    $.ajax("/api/favors", {
        type: "POST",
        data: newFavor
    }).then(
        function () {
            console.log("created the new favor");
            // Reload the page to get the updated list
            location.reload();
        });
}




//=================================================
// On Page Load
//=================================================
$(document).ready(function () {


       // ========================================================================
    // When the submit button is clicked, a new row is added to the database
    // ========================================================================
    $(document).on('click', '#submitBtn', function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log("i clicked submit");
        addFavor();
    });


});