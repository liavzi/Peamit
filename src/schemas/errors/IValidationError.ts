interface ISingleValidationError{
    type :string;
}

interface IValidationError extends Error {
    errors:ISingleValidationError[];
}

export = IValidationError;


