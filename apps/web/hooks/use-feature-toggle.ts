const features = [
    {
        enabled: false,
        name: 'auth',
    },
]

export function useFeatureToggle() {
    function isFeatureEnabled(feature: string) {
        return features.find((f) => f.name === feature)?.enabled ?? false
    }

    return {
        isFeatureEnabled,
    }
}
