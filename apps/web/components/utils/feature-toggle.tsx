export enum FeatureNames {
    ColorMode = 'color-mode',
}

export type FeatureConfig = {
    enabled: boolean
}

export const FEATURES: Record<FeatureNames, FeatureConfig> = {
    'color-mode': {
        enabled: false,
    },
}

export function FeatureToggle({
    children,
    name,
}: {
    children: React.ReactNode
    name: FeatureNames
}) {
    const feature = FEATURES[name]

    if (feature?.enabled) {
        return children
    }

    return null
}
