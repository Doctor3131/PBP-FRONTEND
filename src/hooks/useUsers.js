import { useState, useMemo } from 'react';
import { USERS } from '../data/usersData';

export const useUsers = () => {
  const [users] = useState(USERS);

  const totalUsers = useMemo(() => users.length, [users]);

  return {
    users,
    totalUsers,
  };
};