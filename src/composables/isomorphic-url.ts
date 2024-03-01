import { useRuntimeConfig } from '#imports';

/**
 * Returns the URL with the correct base URL for the current environment.
 * @param url
 */
export const useIsomorphicUrl = (url: string) => {
    const config = useRuntimeConfig();
    const baseUrl = typeof window === 'undefined' ? config.public.authJs.baseUrl : '';

    return `${baseUrl}${url}`;
};
