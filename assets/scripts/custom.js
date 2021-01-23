function isLsSupported() {
    try {
        localStorage.setItem("check", "check");
        localStorage.removeItem("check");
        return true;
    } catch(e) {
        return false;
    }
}


function switchTheme() {
    if(isLsSupported()) {
        var currentTheme = localStorage.currentTheme;
        if(currentTheme === "default") {
            localStorage.currentTheme = "dark";
        }
        else if(currentTheme === "dark") {
            localStorage.currentTheme = "default";
        }
        location.reload();
    }
}


function getAge() {
    var today = new Date();
    var birthDate = new Date("June 23, 2003");
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


window.onload = function() {
    // Theme Modifier
    if(isLsSupported()) {
        var currentTheme = localStorage.currentTheme;
        if(!currentTheme) {
            localStorage.currentTheme = "dark";
            currentTheme = "dark";
        }
        if(currentTheme === "default") {
            document.getElementById("default-theme").disabled = false;
            document.getElementById("dark-theme").disabled = true;
        }
        else if(currentTheme === "dark") {
            document.getElementById("dark-theme").disabled = false;
            document.getElementById("default-theme").disabled = true;
        }
    }
    else {
        document.getElementById("default-theme").disabled = false;
        document.getElementById("dark-theme").disabled = true;
        document.getElementById("footer-switchtheme").innerHTML = "";
    }

    // HitCounter Updater
    var req = new XMLHttpRequest();
    req.open("GET", "https://hitcounter.pythonanywhere.com/count?url=pesaventofilippo.com", true);
    req.onload = function (e) {
        if (req.readyState === 4) {
            if (req.status === 200) {
                var hitcounter = document.getElementById("hitcounter");
                if (hitcounter) {
                    hitcounter.innerText = req.responseText;
                }
            }
        }
    }
    req.send(null);

    // Calculate age
    var age = document.getElementById("age");
    if (age) {
        age.innerHTML = getAge();
    }
}
