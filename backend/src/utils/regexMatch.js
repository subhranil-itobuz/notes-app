//eslint-disable-next-line
const userNameSymbolsRegex = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/
const upperCaseRegex = /(?=.*?[A-Z])/
const lowerCaseRegex = /(?=.*?[a-z])/
const digitRegex = /(?=.*?[0-9])/
const passwordSymbolRegex = /(?=.*?[#?!@.$%^&*-])/

//function to validate username with regex
export const userNameRegexValidation = (userName) => {
    if (userNameSymbolsRegex.test(userName))
        throw new Error("Symbols are not allowed in username");

    else if (upperCaseRegex.test(userName))
        throw new Error("UPPERCASE character is not allowed in username");

    else if (!lowerCaseRegex.test(userName))
        throw new Error("lowercase character is required in username");

    else if (!digitRegex.test(userName))
        throw new Error("Atleast one digit (0-9) is required in username");
}

//function to validate password with regex
export const passwordRegexValidation = (password) => {
    if (!upperCaseRegex.test(password))
        throw new Error("Atleast one UPPERCASE character is required in password");

    else if (!lowerCaseRegex.test(password))
        throw new Error("Atleast one lowercase character is required in password");

    else if (!digitRegex.test(password))
        throw new Error("Atleast one digit (0-9) is required in password");

    else if (!passwordSymbolRegex.test(password))
        throw new Error("Atleast one special character is required in password");
}