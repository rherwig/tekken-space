/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare module '*.mdx' {
    let MDXComponent: (props) => JSX.Element
    export default MDXComponent
}
