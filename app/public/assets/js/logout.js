window.addEventListener("load", function () {

    var allSubmitBtns = document.querySelectorAll(".signout")

    for (var i = 0; i < allSubmitBtns.length; i++) {
        allSubmitBtns[i].addEventListener("click", function () {
            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    FB.logout(function (response) {
                        window.location.href = window.location.origin
                    });
                }
            });

        });
    }

});