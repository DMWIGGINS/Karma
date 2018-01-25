// Facebook black magic
window.fbAsyncInit = function () {
    FB.init({
        appId: '454481624954762',
        cookie: true,
        xfbml: true,
        version: 'v2.11'
    });

    FB.AppEvents.logPageView();
};