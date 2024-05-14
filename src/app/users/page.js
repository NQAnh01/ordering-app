import UserTabs from '@/components/layouts/UserTabs';
import React from 'react';

const Users = () => {
  return (
    <div>
      <UserTabs isAdmin={true} />
      <h1>Users</h1>
    </div>
  );
};

export default Users;
