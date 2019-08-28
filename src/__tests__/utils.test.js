import { getRoomsUsersCount } from 'utils';

const createRoom = length => ({
  currentState: {
    getMembers: () => Array(length),
  },
});

const rooms = [createRoom(10), createRoom(10), createRoom(10), createRoom(10), createRoom(10), createRoom(1)];

it('Test rooms users count', () => {
  expect(getRoomsUsersCount(rooms)).toEqual([['1', 1], ['10', 5]]);
});
