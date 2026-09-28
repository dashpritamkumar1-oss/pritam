import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => removeToast(id), toast.duration || 4000);
  }, [removeToast]);

  const success = useCallback((title: string, message?: string) => addToast({ title, message: message || '', type: 'success' }), [addToast]);
  const error = useCallback((title: string, message?: string) => addToast({ title, message: message || '', type: 'error' }), [addToast]);
  const warning = useCallback((title: string, message?: string) => addToast({ title, message: message || '', type: 'warning' }), [addToast]);
  const info = useCallback((title: string, message?: string) => addToast({ title, message: message || '', type: 'info' }), [addToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, success, error, warning, info }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto rounded-xl shadow-lg border p-4 toast-enter flex gap-3 ${
            toast.type === 'success' ? 'bg-green-50 dark:bg-green-900/40 border-green-200 dark:border-green-800' :
            toast.type === 'error' ? 'bg-red-50 dark:bg-red-900/40 border-red-200 dark:border-red-800' :
            toast.type === 'warning' ? 'bg-amber-50 dark:bg-amber-900/40 border-amber-200 dark:border-amber-800' :
            'bg-blue-50 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800'
          }`}
        >
          <div className="flex-shrink-0 mt-0.5">
            {toast.type === 'success' && <span className="text-lg">✅</span>}
            {toast.type === 'error' && <span className="text-lg">❌</span>}
            {toast.type === 'warning' && <span className="text-lg">⚠️</span>}
            {toast.type === 'info' && <span className="text-lg">ℹ️</span>}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold ${
              toast.type === 'success' ? 'text-green-800 dark:text-green-200' :
              toast.type === 'error' ? 'text-red-800 dark:text-red-200' :
              toast.type === 'warning' ? 'text-amber-800 dark:text-amber-200' :
              'text-blue-800 dark:text-blue-200'
            }`}>{toast.title}</p>
            {toast.message && <p className={`text-xs mt-0.5 ${
              toast.type === 'success' ? 'text-green-600 dark:text-green-300' :
              toast.type === 'error' ? 'text-red-600 dark:text-red-300' :
              toast.type === 'warning' ? 'text-amber-600 dark:text-amber-300' :
              'text-blue-600 dark:text-blue-300'
            }`}>{toast.message}</p>}
          </div>
          <button onClick={() => removeToast(toast.id)} className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">✕</button>
        </div>
      ))}
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
