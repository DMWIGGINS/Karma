window.addEventListener("load", function () {

    FB.getLoginStatus(function (response) {
        if (response.status != 'connected') {
            logFacebookUserOut();
        }
    });

    var allSubmitBtns = document.querySelectorAll(".signout")

    for (var i = 0; i < allSubmitBtns.length; i++) {
        allSubmitBtns[i].addEventListener("click", function () {
            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    FB.logout(function (response) {
                        logFacebookUserOut();
                    });
                }
            });

        });
    }

});

function logFacebookUserOut() {
    // Calls the server to tells is that the user is no longer logged in to Facebook
    $.ajax("/api/user/logout", {
        type: "POST"
    }).then(
        function () {
            // Redirect the webpage to the profile page if we've successfully created a user
            window.location.href = window.location.origin
        }
    );
};