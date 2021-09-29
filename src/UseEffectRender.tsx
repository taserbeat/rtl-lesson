import { useState, useEffect } from 'react';
import axios from 'axios';

/** ユーザーモデル */
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const UseEffectRender = () => {
  const [user, setUser] = useState<User | null>(null);

  const fetchJson = async () => {
    const response = await axios.get<User>(
      'https://jsonplaceholder.typicode.com/users/1'
    );

    return response.data;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const resUser = await fetchJson();

      setUser(resUser);
    };

    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <p>
          I am {user.username} : {user.email}
        </p>
      ) : null}
    </div>
  );
};

export default UseEffectRender;
