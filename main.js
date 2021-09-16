$(document).ready(function () {

    //set defaults
    try {
        $('select[name="signup"]').val(getCookie('DR_scrim_signup'));
        $('select[name="openclose"').val(getCookie('DR_scrim_openclose'));
        $('select[name="scrimstart"]').val(getCookie('DR_scrim_scrimstart'));
        $('select[name="leagueboxes"]').val(getCookie('DR_scrim_leagueboxes'));
        post("http://deeproute.com/?js=scrimsign").then(
            function (response) {
                console.log(response);
            }, function (error) {
                // handle errors
            });
    } catch {
        console.log('default scrimmage values not set yet');
    }


    //store values
    $('input.btn-primary').click(function () {
        $('select').each(function (i, el) {
            let name = 'DR_scrim_' + $(el).attr('name');
            let val = $(el).val();
            setCookie(name, val, 7);
        });
    });

    console.log('ready');
});

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function post(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send('lgno=' + escape(document.forms['scrim'].leagueboxes.value));
    });
}
