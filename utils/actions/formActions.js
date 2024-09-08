import {
    validateString,
    validatePassword,
    validateEmail,
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
    }
}
