import { VFC } from 'react';

export interface Framwwork {
  id: number;
  item: string;
}

interface FrameworkListProps {
  frameworks?: Framwwork[];
}

const FrameworkList: VFC<FrameworkListProps> = (props) => {
  const { frameworks } = props;

  if (!frameworks || frameworks.length === 0) {
    return <h1>No data!</h1>;
  }

  return (
    <div>
      <ul>
        {frameworks.map((framework) => (
          <li key={framework.id}>{framework.item}</li>
        ))}
      </ul>
    </div>
  );
};

export default FrameworkList;
