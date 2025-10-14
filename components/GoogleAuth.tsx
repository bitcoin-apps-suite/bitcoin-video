import React from 'react';

interface GoogleAuthButtonProps {
  onAuthSuccess?: (user: any) => void;
  onAuthFailure?: () => void;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ onAuthSuccess, onAuthFailure }) => {
  const handleClick = () => {
    // Simulate auth success for now
    const mockUser = { name: 'Test User', email: 'test@example.com' };
    onAuthSuccess?.(mockUser);
  };

  return (
    <button 
      onClick={handleClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleAuthButton;