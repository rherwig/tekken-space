import { computed, type Ref, unref } from 'vue';

type NumberOrRef = number | Ref<number>;

/**
 * Calculates the wrapped around value within a given range.
 *
 * @param {NumberOrRef} value - The value to be wrapped around.
 * @param {NumberOrRef} min - The minimum value of the range.
 * @param {NumberOrRef} max - The maximum value of the range.
 * @returns - The wrapped around value within the range.
 */
export const useWrapAround = (
    value: NumberOrRef,
    min: NumberOrRef,
    max: NumberOrRef,
) => {
    const _value = unref(value);
    const _min = unref(min);
    const _max = unref(max);

    return computed(() => {
        if (_value >= _max) {
            return _min;
        }

        if (_value < _min) {
            return _max - 1;
        }

        return _value;
    });
};
