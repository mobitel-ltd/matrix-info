import { bots, getUserId } from 'utils';
import { name } from 'faker';

export const projectName = 'MY';

export const roomName = `${projectName}-123`;

export const dates = [new Date(2018, 10, 12), new Date(2018, 12, 12)];
export const lastEventDate = new Date(2019, 1, 12);

export const roomId = '2';

const fakeMembers = [name, name, name].map(item => item.firstName().toLowerCase());
const fakeMatrixUsers = fakeMembers.map(getUserId);

export const fakeRooms = (users = fakeMatrixUsers) => [
  {
    roomId,
    name: roomName,
    timeline: [
      { target: null, getSender: () => users[0], getDate: () => dates[0] },
      { target: null, getSender: () => users[1], getDate: () => dates[1] },
      { target: null, getSender: () => users[2], getDate: () => lastEventDate },
    ],
    getJoinedMembers: () => users.map(userId => ({ userId })),
  },
];

export const fakeRoomsWithTarget = users => [
  {
    roomId,
    name: roomName,
    timeline: [
      { target: 'member', getSender: () => users[0], getDate: () => dates[0] },
      { target: null, getSender: () => users[1], getDate: () => dates[1] },
      { target: null, getSender: () => users[2], getDate: () => lastEventDate },
    ],
    getJoinedMembers: () => users.map(userId => ({ userId })),
  },
];

export const fakeRoomsWithBot = users => [
  {
    roomId,
    name: roomName,
    timeline: [
      { target: 'member', getSender: () => bots[0], getDate: () => dates[0] },
      { target: null, getSender: () => users[1], getDate: () => dates[1] },
      { target: null, getSender: () => users[2], getDate: () => lastEventDate },
    ],
    getJoinedMembers: () => users.map(userId => ({ userId })),
  },
];
