import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DBTeste = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      console.log('Fetching users from backend');
      try {
        const response = await axios.get('http://localhost:3001/users');
        console.log('Users fetched successfully', response.data);
        setUsers(response.data);
      } catch (error: any) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Database Test Page</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DBTeste;
