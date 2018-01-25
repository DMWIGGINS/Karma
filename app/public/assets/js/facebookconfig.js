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