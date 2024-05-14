import UserTabs from '@/components/layouts/UserTabs';
import React from 'react';

const Orders = () => {
  return (
    <div>
      <UserTabs isAdmin={false} />
      <h1>Orders</h1>
    </div>
  );
};

export default Orders;
