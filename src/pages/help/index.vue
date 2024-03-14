<script lang="ts" setup>
import TsNotationDisplay from '~/components/ui/notation/ts-notation-display.vue';

const attackButtons = [
    { notation: '1', explanation: 'Left Punch' },
    { notation: '2', explanation: 'Right Punch' },
    { notation: '3', explanation: 'Left Kick' },
    { notation: '4', explanation: 'Right Kick' },
];

const movementButtons = [
    { notation: 'f', explanation: 'Tap Forward' },
    { notation: 'd', explanation: 'Tap Down' },
    { notation: 'b', explanation: 'Tap Back' },
    { notation: 'u', explanation: 'Tap Up' },
    { notation: 'N', explanation: 'Neutral (let go of all movements)' },
];
</script>

<template>
    <div class="container">
        <h1 class="text-2xl mb-2">Tekken Notation</h1>
        <p class="text-copy/50 mb-8 max-w-[80ch]">
            Tekken Notation is a way to describe the moves in the game. It is a combination of
            numbers, letters and special characters that represent the different buttons on the
            controller.
        </p>

        <div class="grid grid-cols-2 gap-4">
            <div class="bg-black/25 rounded-md p-4">
                <table>
                    <thead>
                        <tr>
                            <th>Notation</th>
                            <th>Display</th>
                            <th>Explanation</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            class=""
                            v-for="move in movementButtons"
                            :key="move.notation"
                        >
                            <td class="font-mono py-2 px-4 font-bold">{{ move.notation }}</td>
                            <td class="px-8 py-2">
                                <TsNotationDisplay :notation="move.notation" />
                            </td>
                            <td class="py-2 px-8">{{ move.explanation }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="bg-black/25 rounded-md p-4">
                <table>
                    <thead>
                        <tr>
                            <th>Notation</th>
                            <th>Display</th>
                            <th>Explanation</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            class=""
                            v-for="move in attackButtons"
                            :key="move.notation"
                        >
                            <td class="font-mono py-2 px-4 font-bold">{{ move.notation }}</td>
                            <td class="px-8 py-2">
                                <TsNotationDisplay :notation="move.notation" />
                            </td>
                            <td class="py-2 px-8">{{ move.explanation }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
