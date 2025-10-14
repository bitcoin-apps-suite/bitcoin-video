import React from 'react';

interface StorageOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (option: any) => void;
  selectedOption: any;
  pricing: any;
}

const StorageOptionsModal: React.FC<StorageOptionsModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedOption,
  pricing
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-lg font-bold mb-4">Storage Options</h3>
        <p className="text-gray-300 mb-4">Storage cost: {pricing?.totalCostUSD || 0}¢</p>
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default StorageOptionsModal;