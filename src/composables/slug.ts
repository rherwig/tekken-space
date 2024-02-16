export const useSlug = (nameOrSlug: string) => {
    const slug = nameOrSlug.toLowerCase().replace(/\s+/, '-');
    const name = slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

    return {
        name,
        slug,
    };
};
