import toast from 'react-hot-toast';

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      id: `success-${Date.now()}`,
    });
  },
  error: (message: string) => {
    toast.error(message, {
      id: `error-${Date.now()}`,
    });
  },
  loading: (message: string) => {
    return toast.loading(message, {
      id: `loading-${Date.now()}`,
    });
  },
  dismiss: (toastId: string) => {
    toast.dismiss(toastId);
  },
};
