import React, { useEffect, useRef, useState } from 'react';

export default function Input({
  type,
  question,
  placeHolder,
  min,
  max,
  disabled,
  onChangeValue,
}: {
  type: 'text' | 'numeric';
  question: string;
  placeHolder: string;
  min: number;
  disabled?: boolean;
  max: number;
  onChangeValue?: (value: string | number) => void;
}) {
  const [isTyping, setIsTyping] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    let error = '';
    let processedValue: string | number = value;

    if (value === '') {
      error = 'You must fill this field';
    } else if (type === 'numeric') {
      const numericValue = parseInt(value);
      if (numericValue >= min && numericValue <= max) {
        processedValue = numericValue;
      } else {
        error = 'You must be over 18 to play on this server';
        processedValue = ''; // Assuming we want to reset or indicate invalid input
      }
    } else if (type === 'text') {
      resizeTextArea(e);
      if (value.length < min || value.length > max) {
        error = `You must write at least ${min} characters and no longer than ${max}`;
        processedValue = ''; // Assuming we want to reset or indicate invalid input
      }
    }

    setErrorMessage(error);
    if (onChangeValue) onChangeValue(processedValue);
  };

  const resizeTextArea = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.scrollHeight > e.target.clientHeight) {
      e.target.style.height = e.target.scrollHeight + 'px';
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-black text-gray-400 w-full">
      <div className="container mx-auto px-5 py-10">
        <div
          className={`relative rounded-md border } ${
            isTyping ? 'border-orange' : 'border-gray-600'
          }
          
          `}
        >
          {(() => {
            if (type === 'numeric') {
              return (
                <input
                  ref={inputRef}
                  className="caret-transparent p-3 outline-none w-full bg-transparent text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  type="number"
                  placeholder={placeHolder}
                  min={min}
                  max={max}
                  onClick={() => setIsTyping(true)}
                  onChange={handleChange}
                  disabled={disabled}
                />
              );
            } else if (type === 'text') {
              return (
                <textarea
                  ref={inputRef}
                  placeholder={placeHolder}
                  onClick={() => setIsTyping(true)}
                  onChange={handleChange}
                  disabled={disabled}
                  className="bg-transparent resize-none outline-none p-10 w-full text-white caret-transparen overflow-y-hidden caret-transparent"
                ></textarea>
              );
            }
          })()}
          <h2 className="absolute flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="bg-black px-2 text-lg font-medium">
              {question}
            </span>
          </h2>
        </div>
        <label className="text-red-900">{errorMessage}</label>
      </div>
    </div>
  );
}
