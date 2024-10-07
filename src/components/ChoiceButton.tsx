import { Choice } from '../types';

interface Props {
  choice: Choice;
  onClick: (choice: Choice) => void;
  keyboardShortcut: number;
}

export function ChoiceButton(props: Props) {
  return (
    <button className='w-full md:w-auto btn btn-light' onClick={(e) => {props.onClick(props.choice)}}>
      <span className="mr-2">{props.keyboardShortcut}:</span>
      {props.choice.text}
    </button>
  );
}
