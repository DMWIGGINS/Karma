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

// Self-invoked function that injects the Facebook script tag into the header of any html page that the home.js script tag lives in
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

    // Allows us to determine if a user is logged in to Facebook and has authenticated our app.
    FB.getLoginStatus(function (response) {
        // Take the response (which is the state of the user) and pass it to the log in call back.
        facebookLogInCallback(response);
    });

});


// This function handles what to do with the user state response from Facebook
// Note: This is also used as the call back from the log in button on the landing page
function facebookLogInCallback(response) {
    // If Facebook returns that the user is connected (if it's the first auth then the user approves permission for app to grab user info)
    if (response.status == "connected") {
        // Make a call to the FB API and grab the users name, picture, email, and location.
        //TODO: Add user location.
        FB.api("/me?fields=name,picture,email", function (response) {

            // Take the response from FB and make it a new user object that includes name, email, picture, and ID.
            // TODO: Add user location.
            var newUser = {
                user_name: response.name,
                user_email: response.email,
                fb_user_pic: response.picture.data.url,
                fb_user_id: response.id
            };

            // Then take the new user object and post it to the server to make a new user.
            $.ajax("/api/user/create", {
                type: "POST",
                data: newUser
            }).then(
                function () {
                    // Redirect the webpage to the profile page if we've successfully created a user
                    // FIXME: Since I can't figure out how to redirect on the server temporarily redirecting on the client. HELPME.
                    window.location.href = window.location.origin + "/profile"
                }
            );
        });
    }
}