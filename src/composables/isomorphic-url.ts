/**
 * Returns the URL with the correct base URL for the current environment.
 * @param url
 */
export const useIsomorphicUrl = (url: string) => {
    const baseUrl = typeof window === 'undefined' ? process.env.ORIGIN : '';

    return `${baseUrl}${url}`;
};
