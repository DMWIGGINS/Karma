// Facebook black magic
//Karma-dev API key: 454481624954762
//heroku api key:  840301142808607
window.fbAsyncInit = function () {
    FB.init({
        appId: '454481624954762',
        cookie: true,
        xfbml: true,
        version: 'v2.11'
    });

    FB.AppEvents.logPageView();
};