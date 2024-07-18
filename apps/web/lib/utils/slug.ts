export function slugify(value: string) {
    return value.toLowerCase().replace(/\s/g, '-')
}
