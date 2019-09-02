import { bots, getUserId, getProjectName, getLastEventDate } from 'utils';
import * as faker from 'faker';
import { sortBy } from 'lodash';

export const projectName = 'MY';

export const roomName = `${projectName}-123`;

export const dates = [new Date(2018, 10, 12), new Date(2018, 12, 12)];
export const lastEventDate = new Date(2019, 1, 12);

export const roomId = '2';

const fakeMembers = length => [...Array(length)].map(() => faker.name.firstName().toLowerCase());
const fakeMatrixUsers = fakeMembers(3).map(getUserId);

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

const fakeProjects = [...Array(10)].map(faker.hacker.abbreviation);

export const parsedRoomsFactory = () => {
  const name = faker.random.arrayElement([
    ...fakeProjects.map(p => `${p}-${faker.random.number()}`),
    faker.hacker.phrase().replace('-', ''),
  ]);
  const members = fakeMembers(faker.random.number({ min: 1, max: 10 }));
  const messages = [...Array(faker.random.number({ min: 0, max: 10 }))].map(() => ({
    sender: faker.random.arrayElement(members),
    date: faker.date.past(1),
  }));

  return {
    name,
    messages: sortBy(messages, 'date'),
    lastEventDate: getLastEventDate(messages),
    members,
    roomId: faker.random.alphaNumeric(),
    project: getProjectName(name),
  };
};
