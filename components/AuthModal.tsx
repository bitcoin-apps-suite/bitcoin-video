import React from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuth?: (method: string) => void;
  children?: React.ReactNode;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuth, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
        {children || (
          <>
            <h3 className="text-lg font-bold mb-4">Authentication</h3>
            <p className="text-gray-300 mb-4">Choose your authentication method</p>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  onAuth?.('google');
                  onClose();
                }}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
              >
                Google
              </button>
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;