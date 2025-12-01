import { useToastStore } from '../../../stores/useToastStore';
import type { ToastType } from '../../../stores/useToastStore';

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  const getToastStyles = (type: ToastType) => {
    const styles = {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      warning: 'bg-yellow-500 text-white',
      info: 'bg-blue-500 text-white',
    };
    return styles[type];
  };

  const getIcon = (type: ToastType) => {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
    };
    return icons[type];
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getToastStyles(toast.type)} px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] animate-fade-in`}
        >
          <span className="text-2xl">{getIcon(toast.type)}</span>
          <p className="flex-1 font-bold">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/80 hover:text-white text-xl font-bold"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}