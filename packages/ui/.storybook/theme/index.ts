import { create } from '@storybook/theming'

const colors = {
    primary: '#171717',
    primaryForeground: '#FAFAFA',
    secondary: '#00C950',
    accent: '#262626',
    border: '#262626',
}

export default create({
    base: 'dark',
    brandTitle: 'TekkenSpace',
    brandUrl: 'https://tekken.space',

    colorPrimary: colors.primary,
    colorSecondary: colors.secondary,

    // UI
    appBg: colors.primary,
    appContentBg: colors.accent,
    appPreviewBg: colors.primary,
    appBorderColor: colors.border,
    appBorderRadius: 4,

    // Text colors
    textColor: colors.primaryForeground,
    textInverseColor: colors.primary,

    // Toolbar default and active colors
    barTextColor: colors.primaryForeground,
    barSelectedColor: colors.secondary,
    barHoverColor: colors.secondary,
    barBg: colors.primary,

    // Form colors
    inputBg: colors.primary,
    inputBorder: colors.border,
    inputTextColor: colors.primaryForeground,
    inputBorderRadius: 2,
})
