// Facebook black magic
// Karma-Dev API Key: 223747754858020
window.fbAsyncInit = function () {
    FB.init({
        appId: '155211281929544',
        cookie: true,
        xfbml: true,
        version: 'v2.11'
    });

    FB.AppEvents.logPageView();
};