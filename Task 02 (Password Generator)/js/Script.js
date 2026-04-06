
    function generatePassword() {
        let length = 15;
    let chars = "abcdefghijklmnopqrstuvwxyz";

    if (document.getElementById("chkUppercase").checked) {
        chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (document.getElementById("chkNumbers").checked) {
        chars += "0123456789";
    }

    if (document.getElementById("chkSymbols").checked) {
        chars += "!@#$%^&*()";
    }

    let password = "";

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
    }

    document.getElementById("password").value = password;
}
