import React from 'react';
import { Choice } from '../types';

interface Props {
  choice: Choice;
  onClick: (choice: Choice) => void;
  keyboardShortcut: number;
}

export function ChoiceButton(props: Props) {
  return (
    <button 
      className='w-full md:w-auto btn btn-light flex flex-col items-center justify-center p-2 m-1'
      onClick={() => props.onClick(props.choice)}
    >
      <span className="text-sm mb-1">{props.choice.text}</span>
      <span className="text-xs bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center">
        {props.keyboardShortcut}
      </span>
    </button>
  );
}
