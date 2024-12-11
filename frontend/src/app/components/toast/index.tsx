'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';

// Tipos de mensagem
export type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
    id: number;
    type: ToastType;
    message: string;
}

interface ToastContextProps {
    addToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

// Toast Provider
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    // Adiciona um novo toast
    const addToast = (message: string, type: ToastType) => {
        const id = Date.now();
        setToasts((prevToasts) => [...prevToasts, { id, type, message }]);
    };

    // Remove o toast automaticamente após 3 segundos
    useEffect(() => {
        if (toasts.length > 0) {
            const timer = setTimeout(() => {
                setToasts((prevToasts) => prevToasts.slice(1));
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [toasts]);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed inset-x-0 bottom-20 flex flex-col items-center gap-3 z-50">
                {toasts.map((toast) => (
                    <Toast id={toast.id} type={toast.type} message={toast.message} />
                ))}
            </div>

        </ToastContext.Provider>
    );
};

// Componente Individual de Toast
const Toast: React.FC<ToastMessage> = ({ id, type, message }) => {
    const getColor = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500';
            case 'error':
                return 'bg-red-500';
            case 'info':
                return 'bg-blue-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div
            className={`flex items-center px-4 py-2 rounded shadow-lg text-white ${getColor()}`}
            id={id.toString()}
        >
            <span>{message}</span>
        </div>
    );
};

// Hook para usar o Toast
export const useToast = (): ToastContextProps => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};