import { useState } from 'react';
import axios from 'axios';

import { User } from './UseEffectRender';

const MockServer = () => {
  const [clicked, setClicked] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const fetchUser = async () => {
    axios
      .get<User>('https://jsonplaceholder.typicode.com/users/1')
      .then((response) => {
        const resUsername = response.data.username;
        setUsername(resUsername);
        setClicked(true);
      })
      .catch(() => {
        setError('Fetching Failed!');
      });
  };

  const buttonText = clicked ? 'Loaded' : 'Start Fetch';

  return (
    <div>
      <button onClick={fetchUser} disabled={clicked}>
        {buttonText}
      </button>

      {username && <h3>{username}</h3>}
      {error && <p data-testid="error">{error}</p>}
    </div>
  );
};

export default MockServer;
