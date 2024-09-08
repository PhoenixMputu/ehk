import { validate } from 'validate.js';

export const validateString = (id, value) => {
  const constraints = {
      presence: {
          allowEmpty: false,
          message: "doit être rempli"
      },
      length: {
          minimum: 3,
          message: "doit avoir au moins 3 caracteres"
      },
      format: {
          pattern: "^[a-zA-Z]+$",
          message: "doit avoir seulement des lettres"
      }
  };

  const validationResult = validate({ [id]: value }, { [id]: constraints });
  return validationResult && validationResult[id];
}

export const validateEmail = (id, value) => {
  const constraints = {
    presence: {
      allowEmpty: false,
      message: "L'email doit être rempli"
    },
    format: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Format d'email invalide"
    }
  };

  const validationResult = validate({ [id]: value }, { [id]: constraints });
  return validationResult && validationResult[id];
};

export const validatePassword = (id,value)=>{
    const constraints = {
        presence : {
            allowEmpty:false,
            message: "L'email doit être rempli"
        }
    };

    if(value !== ""){
        constraints.length = {
            minimum: 6,
            message: "doit avoir au moins 6 characters"
        }
    };

    const validationResult = validate({ [id]: value}, {[id]: constraints});
    return validationResult && validationResult[id];
}