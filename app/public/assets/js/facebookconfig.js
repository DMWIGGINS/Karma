// Facebook black magic
window.fbAsyncInit = function () {
    FB.init({
        appId: '155211281929544',
        cookie: true,
        xfbml: true,
        version: 'v2.11'
    });

    FB.AppEvents.logPageView();
};