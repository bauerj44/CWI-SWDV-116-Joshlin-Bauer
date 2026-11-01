function isStrongPassword(password) {
    const hasLength = password.length >= 12;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    const specialCharacters = "!@#$%^&*()_+{}[]|/<>?";
    const hasSpecial = [...specialCharacters].some(function(character) {
        return password.includes(character);
    });

    const doesNotContainPassword =
        !password.toLowerCase().includes("password");

    const isStrong =
        hasLength &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecial &&
        doesNotContainPassword;

    if (isStrong) {
        console.log("Strong Password");
    } else {
        console.log("Weak Password");
    }

    return isStrong;
}

const password = prompt("Enter a password:");

isStrongPassword(password);