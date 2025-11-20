'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const Button = ({ 
    onClick, 
    className = '', 
    children, 
    variant = 'number' 
  }: { 
    onClick: () => void; 
    className?: string; 
    children: React.ReactNode; 
    variant?: 'number' | 'operator' | 'function' | 'equals';
  }) => {
    const baseClasses = "h-16 rounded-full font-medium text-xl transition-all duration-150 active:scale-95 hover:brightness-110";
    
    const variantClasses = {
      number: "bg-gray-700 text-white hover:bg-gray-600",
      operator: "bg-orange-500 text-white hover:bg-orange-400",
      function: "bg-gray-500 text-black hover:bg-gray-400",
      equals: "bg-orange-500 text-white hover:bg-orange-400"
    };

    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-black rounded-3xl p-6 shadow-2xl border border-gray-800 max-w-sm w-full">
        {/* Display */}
        <div className="bg-black rounded-2xl p-6 mb-4">
          <div className="text-right text-white text-4xl font-light overflow-hidden">
            {display.length > 9 ? parseFloat(display).toExponential(3) : display}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button onClick={clear} variant="function" className="col-span-3">
            Clear
          </Button>
          <Button onClick={() => performOperation('÷')} variant="operator">
            ÷
          </Button>

          {/* Row 2 */}
          <Button onClick={() => inputNumber('7')} variant="number">
            7
          </Button>
          <Button onClick={() => inputNumber('8')} variant="number">
            8
          </Button>
          <Button onClick={() => inputNumber('9')} variant="number">
            9
          </Button>
          <Button onClick={() => performOperation('×')} variant="operator">
            ×
          </Button>

          {/* Row 3 */}
          <Button onClick={() => inputNumber('4')} variant="number">
            4
          </Button>
          <Button onClick={() => inputNumber('5')} variant="number">
            5
          </Button>
          <Button onClick={() => inputNumber('6')} variant="number">
            6
          </Button>
          <Button onClick={() => performOperation('-')} variant="operator">
            −
          </Button>

          {/* Row 4 */}
          <Button onClick={() => inputNumber('1')} variant="number">
            1
          </Button>
          <Button onClick={() => inputNumber('2')} variant="number">
            2
          </Button>
          <Button onClick={() => inputNumber('3')} variant="number">
            3
          </Button>
          <Button onClick={() => performOperation('+')} variant="operator">
            +
          </Button>

          {/* Row 5 */}
          <Button onClick={() => inputNumber('0')} variant="number" className="col-span-2">
            0
          </Button>
          <Button onClick={inputDecimal} variant="number">
            .
          </Button>
          <Button onClick={handleEquals} variant="equals">
            =
          </Button>
        </div>
      </div>
    </div>
  );
}

