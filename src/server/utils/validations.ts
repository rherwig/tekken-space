/**
 * Creates an error, if the value is not defined.
 * @param value
 * @param argumentName
 */
export function assertDefined<T = any>(value: T | undefined, argumentName?: string) {
    if (value === undefined) {
        throw createError({
            statusCode: 400,
            message: argumentName ? `${argumentName} is required` : 'Missing argument',
        });
    }
}

/**
 * Creates an error, if the value is not found.
 * @param value
 * @param argumentName
 */
export function assertFound<T = any>(value: T | undefined | null, argumentName?: string) {
    if (value === undefined) {
        throw createError({
            statusCode: 404,
            message: argumentName ? `${argumentName} not found` : 'Not found',
        });
    }
}
