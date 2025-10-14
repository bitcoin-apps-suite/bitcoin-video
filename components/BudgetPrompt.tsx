import React from 'react';

interface BudgetPromptProps {
  isOpen: boolean;
  onClose: () => void;
  currentBudget: number;
  suggestedBudget: number;
  wordCount: number;
  estimatedCost: number;
  onBudgetUpdate: (budget: number) => void;
}

const BudgetPrompt: React.FC<BudgetPromptProps> = ({
  isOpen,
  onClose,
  currentBudget,
  suggestedBudget,
  wordCount,
  estimatedCost,
  onBudgetUpdate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-lg font-bold mb-4">Budget Update</h3>
        <p className="text-gray-300 mb-4">
          Current: ${currentBudget}<br/>
          Suggested: ${suggestedBudget}<br/>
          Words: {wordCount}<br/>
          Cost: ${estimatedCost}
        </p>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              onBudgetUpdate(suggestedBudget);
              onClose();
            }}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors"
          >
            Update Budget
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetPrompt;