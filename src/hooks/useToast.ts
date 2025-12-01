import { useToastStore } from '../stores/useToastStore';

export function useToast() {
  const { addToast } = useToastStore();

  return {
    success: (message: string) =>
      addToast({ type: 'success', message }),

    error: (message: string) =>
      addToast({ type: 'error', message }),

    warning: (message: string) =>
      addToast({ type: 'warning', message }),

    info: (message: string) =>
      addToast({ type: 'info', message }),
  };
}