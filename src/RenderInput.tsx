import { VFC, useState } from 'react';

interface RenderInputProps {
  outputConsole: (value: string) => void;
}

const RenderInput: VFC<RenderInputProps> = ({ outputConsole }) => {
  const [input, setInput] = useState('');

  const outputValue = () => {
    if (input) {
      outputConsole(input);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button onClick={outputValue}>Console</button>
    </div>
  );
};

export default RenderInput;
