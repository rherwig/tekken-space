import { useModal } from '#imports';
import ConfirmDialog from '~/composables/confirm/confirm-dialog.vue';

interface ConfirmDialogOptions {
    title: string;
    message: string;
    variant?: 'warning' | 'error' | 'info';
    confirmButtonText?: string;
    cancelButtonText?: string;
}

/**
 * Composable function to open a confirm dialog.
 * Use this alongside a try/catch block to handle the confirm dialog.
 */
export function useConfirm() {
    const modal = useModal();

    return async (options: ConfirmDialogOptions) =>
        new Promise((resolve, reject) => {
            modal.open(ConfirmDialog, {
                title: options.title,
                message: options.message,
                variant: options.variant,
                confirmButtonText: options.confirmButtonText,
                cancelButtonText: options.cancelButtonText,
                onConfirm: () => {
                    modal.close();
                    return resolve();
                },
                onCancel: () => {
                    modal.close();
                    return reject();
                },
            });
        });
}
