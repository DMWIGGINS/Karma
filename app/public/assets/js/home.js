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