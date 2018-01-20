//=================================================
// Functions
//=================================================
updateFavorToPending(){

}

updateFavorToCompleted(){
    
}

//=================================================
// On Page Load
//=================================================
$(document).ready(function () {


    // ========================================================================
    // When the submit button is clicked, a new row is added to the database
    // ========================================================================
    $(document).on('click', '#pendingBtn', function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log("i clicked the pending button");
        updateFavorToPending();
    });

    // ========================================================================
    // When the update button is clicked, update the row in the database
    // ========================================================================
    $(document).on('click', '#completedBtn', function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log("i clicked the completed button");
        updateFavorToCompleted();
    });


});