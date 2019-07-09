const validation = (value, rules, form) => {
    let valid = true;
    for  (let rule in rules){
        switch (rule) {
            case 'isRequired':
                valid = valid && validateRequired(value)
                break;
            case 'isEmail':
                valid = valid && validateEmail(value)
                break;
            case 'minLength':
                const minLength = rules[rule];
                valid = valid && validateMinLength(value, minLength)
                break;
            case 'maxLength':
                const maxLength = rules[rule];
                valid = valid && validateMaxLength(value, maxLength)
                break;
            case 'confirmEntry':
                const entry = form[rules.confirmEntry].value;
                valid = valid && validateConfirmEntry(value, entry)
                break;
            default:
                valid = true;

        }
    }

    return valid;
};


const validateRequired = (value) => value !== '' && value !== null ;


const validateEmail = (email) => {
    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return expression.test(String(email).toLowerCase());
};


const validateMinLength = (value, minLength) => value.length >= minLength;


const validateMaxLength = (value, maxLength) => value.length <= maxLength;


const validateConfirmEntry = (value, entry) => value === entry;


export default validation;
