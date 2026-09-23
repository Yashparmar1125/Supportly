import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  duration?: number;
}

interface ToastContextValue {
  showToast: (type: ToastType, message: string, title?: string, duration?: number) => void;
  success: (message: string, title?: string, duration?: number) => void;
  error: (message: string, title?: string, duration?: number) => void;
  info: (message: string, title?: string, duration?: number) => void;
  warning: (message: string, title?: string, duration?: number) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string, title?: string, duration = 3500) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newToast: ToastItem = { id, type, message, title, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, duration);
      }
    },
    [dismiss]
  );

  const success = useCallback(
    (message: string, title?: string, duration?: number) =>
      showToast('success', message, title, duration),
    [showToast]
  );

  const error = useCallback(
    (message: string, title?: string, duration?: number) =>
      showToast('error', message, title, duration),
    [showToast]
  );

  const info = useCallback(
    (message: string, title?: string, duration?: number) =>
      showToast('info', message, title, duration),
    [showToast]
  );

  const warning = useCallback(
    (message: string, title?: string, duration?: number) =>
      showToast('warning', message, title, duration),
    [showToast]
  );

  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />,
          accentBorder: 'border-l-emerald-500',
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
          defaultTitle: 'Success',
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />,
          accentBorder: 'border-l-rose-500',
          badge: 'bg-rose-50 text-rose-700 border-rose-200/60',
          defaultTitle: 'Error',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />,
          accentBorder: 'border-l-amber-500',
          badge: 'bg-amber-50 text-amber-800 border-amber-200/60',
          defaultTitle: 'Notice',
        };
      case 'info':
      default:
        return {
          icon: <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />,
          accentBorder: 'border-l-primary',
          badge: 'bg-indigo-50 text-primary border-primary/20',
          defaultTitle: 'Information',
        };
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, success, error, info, warning, dismiss }}>
      {children}
      {/* Toast Notification Layer */}
      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
        aria-live="polite"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((toast) => {
          const style = getToastStyles(toast.type);
          return (
            <div
              key={toast.id}
              role="alert"
              className={`pointer-events-auto flex items-start gap-3 p-3.5 bg-card/95 backdrop-blur-md rounded-xl border border-line ${style.accentBorder} border-l-[3.5px] shadow-[0_20px_45px_-15px_rgba(26,26,46,0.22)] transition-all duration-200 animate-in fade-in slide-in-from-bottom-5`}
            >
              {style.icon}
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold text-ink">
                    {toast.title || style.defaultTitle}
                  </span>
                </div>
                <p className="text-xs text-ink/75 leading-relaxed break-words">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => dismiss(toast.id)}
                className="text-ink/40 hover:text-ink p-1 rounded-md transition-colors hover:bg-canvas cursor-pointer shrink-0"
                aria-label="Close notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
