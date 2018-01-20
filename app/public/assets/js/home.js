// Facebook black magic
window.fbAsyncInit = function () {
    FB.init({
        appId: '840301142808607',
        cookie: true,
        xfbml: true,
        version: 'v2.11'
    });

    FB.AppEvents.logPageView();
};

// Self-invoked function that injects Facebook script tag into the header of the html page
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.addEventListener("load", function () {

    FB.getLoginStatus(function (response) {
        // TODO: This is where on initial load it's going to tell you the status of the current user.
        // statusChangeCallback(response);
    });

});

function facebookLogInCallback(response) {
    console.log("I'm in the log in callback function.", response);
    // Check if the login was good
    if (response.status == "connected") {
        // Need to ask for the individual fields
        FB.api("/me?fields=name,picture,email", function (response) {
            console.log(response);
            // TODO: Next need to call the server to tell it the user info

            var newUser = {
                user_name: response.name,
                user_email: response.email,
                fb_user_pic: response.picture.data.url,
                fb_user_id: response.id
            };

            // Send the POST request.
            $.ajax("/api/user/create", {
                type: "POST",
                data: newUser
            }).then(
                function () {
                    // Reload the page to get the updated list
                    // location.reload();
                }
            );
        });
    }
}