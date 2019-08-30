import React from 'react';
import { observer, inject } from 'mobx-react';
import { getRoomsUsersCount } from 'utils';

const Action = ({ user: { rooms } }) => {
  const groupedRooms = getRoomsUsersCount(rooms);
  return (
    <ul>
      {groupedRooms.map(([ammount, len], index) => (
        <li key={index}>
          You have {len} rooms with {ammount} users
        </li>
      ))}
    </ul>
  );
};

export default inject('user')(observer(Action));
