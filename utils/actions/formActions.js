import {
    validateString,
    validatePassword,
    validateEmail,
    validatePhoneNumber
} from '../ValidationConstraints'

export const validateInput = (inputId, inputValue) => {
    if (
        inputId === 'lastName' ||
        inputId === 'firstName' ||
        inputId === 'province'
    ) {
        return validateString(inputId, inputValue)
    } else if (
        inputId === 'password' ||
        inputId === 'confirmPassword' ||
        inputId === 'newPassword' ||
        inputId === 'confirmNewPassword'
    ) {
        return validatePassword(inputId, inputValue)
    } else if (inputId === 'email') {
        return validateEmail(inputId, inputValue)
    } else if (inputId === 'phoneNumber') {
        return validatePhoneNumber(inputId, inputValue)
    }
}
