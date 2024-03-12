<script lang="ts" setup="">
import { computed } from 'vue';
import type { User } from 'prisma/types';

interface Props {
    user: User;
}

const props = defineProps<Props>();

const isAdmin = computed(() => props.user.role === 'ADMIN');
const isPro = computed(() => props.user.isPro);
const isVirtual = computed(() => props.user.isVirtual);
</script>

<template>
    <div class="flex items-center gap-1">
        <UTooltip
            v-if="isAdmin"
            text="This user is involved in maintaining the site."
        >
            <UBadge
                label="Admin"
                color="red"
                size="xs"
            />
        </UTooltip>

        <UTooltip
            v-if="isPro && !isAdmin"
            text="This user has been granted access to special features. This is awarded by the site maintainer and NOT purchased with real money."
        >
            <UBadge
                label="Pro"
                size="xs"
            />
        </UTooltip>

        <UTooltip
            v-if="isVirtual"
            text="This profile is maintained by the site maintainer with the permission of the respective user."
        >
            <UBadge
                label="Virtual"
                size="xs"
                color="purple"
            />
        </UTooltip>
    </div>
</template>
