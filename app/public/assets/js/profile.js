//Pipe to map the Database items to the handlebars.
//Helen you need logic in here to tell it to use the username to grab those connected items from the other tables.
// The Functions to get asked and given

function MostRecentFavorRequest() {
    var ProfileId = "";
    var MostRecentFavorAsk = {
        favor_KarmaPrice: $("#mostrecentaskfavorprice").val().trim(),
        user_id: ProfileId,
        mostRecent_FavorRequest: $("#mostrecentaskedfavor").val().trim(),
    };
    console.log("totalProfile: " + JSON.stringify(MostRecentFavorAsk));
    // Send the POST request.
    $.ajax("/api/favor/mostRecentAsked", {
        type: "GET",
        data: MostRecentFavorAsk
    }).then(
        function () {
            console.log("this posted to the correct items on the profile page");
            // Reload the page to get the most recent ask
            location.reload();
        });
}

function MostRecentFavorGiven() {
    var MostRecentFavorGiven = {
        favor_KarmaPrice: $("#mostrecentfavorprice").val().trim(),
        user_id: ProfileId,
        mostRecent_FavorRequest: $("#mostrecentaskedfavor").val().trim(),
    };
    console.log("totalProfile: " + JSON.stringify(MostRecentFavorGiven));
    // Send the POST request.
    $.ajax("/api/favor/mostRecentGiven", {
        type: "GET",
        data: MostRecentFavorGiven
    }).then(
        function () {
            console.log("this posted to the correct items on the profile page.");
            // Reload the page to get the most recent favor completed.
            location.reload();
        });
}

//Couple of snags that we should think about. We should walk through how to pass in the favors based on the FB ID,
//that way it will map to where we want it to go. When you add a favor, I'm sure it takes the user ID but how do we flag it?


















//=================================================
// On Page Load
//=================================================
$(document).ready(function () {

}

    //========================================================================
// function createCustomerRow(req, res){
//     db.Customer.create({
//         customer_name: req.body.customer_name
//     })
//     .then(function (data, err) {
//         if (err) {
//             // If an error occurred, send a generic server failure
//             console.log("AN error occured inserting into Customers");
//             console.log(err);
//             res.status(500).end();
//         } else {
//             var customer_id = data.id;
//             createBurgerRow(req, res, customer_id);
//         }
//     });
// }
// function createBurgerRow(req, res, customer_id){
//     db.Burger.create({
//         burger_name: req.body.burger_name,
//         CustomerId: customer_id
//     })
//     .then(function (data, err) {  
//         if (err) {
//             // If an error occurred, send a generic server failure
//             console.log("AN error occured inserting into Bugers");
//             console.log(err);
//             res.status(500).end();
//         } else {
//             // console.log(data);
//             getBurgers(res);;
//         }
//     });
// }
// // add a new burger
// router.post("/api/burgers/new", function (req, res) {
//     createCustomerRow(req, res);  
// });


// Add CommentColl