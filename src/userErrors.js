class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.isCustom = true;
    }
}

class UpperCaseError extends ValidationError {
    constructor(property) {
        super(`${property} property must be in a lower case`);
        this.name = "PropertyRequiredError";
    }
}

class CountOptionsError extends ValidationError {
    constructor(property) {
        if (property) {
            super(`${property} property occurs more than once`);
        } else {
            super ('-c property must be defined')
        }
        this.name = "PropertyRequiredError";
    }
}

const errorHandler = (error) => {
    const { isCustom } = error;
    if (isCustom) {
        console.log(error.name + ': ' + error.message)
        process.exit(1);
    } else {
        throw error;
    }
}

module.exports = {
    UpperCaseError,
    CountOptionsError,
    errorHandler,
};