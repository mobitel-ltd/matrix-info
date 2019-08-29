import { getRoomsUsersCount, parseRoom, getUserId } from 'utils';
import { name } from 'faker';
import {
  fakeRooms,
  roomName,
  projectName,
  lastEventDate,
  roomId,
  dates,
  fakeRoomsWithTarget,
  fakeRoomsWithBot,
} from './fixtures';

const createRoom = length => ({
  members: Array(length),
});

const rooms = [createRoom(10), createRoom(10), createRoom(10), createRoom(10), createRoom(10), createRoom(1)];

let fakeMembers;
let fakeMatrixUsers;

beforeEach(() => {
  fakeMembers = [name, name, name].map(item => item.firstName().toLowerCase());
  fakeMatrixUsers = fakeMembers.map(getUserId);
});

it('Test rooms users count', () => {
  expect(getRoomsUsersCount(rooms)).toEqual([['1', 1], ['10', 5]]);
});

it('Expect parseRoom work correct', () => {
  expect(fakeRooms(fakeMatrixUsers).map(parseRoom)).toEqual([
    {
      name: roomName,
      messages: [
        { sender: fakeMembers[0], date: dates[0] },
        { sender: fakeMembers[1], date: dates[1] },
        { sender: fakeMembers[2], date: lastEventDate },
      ],
      lastEventDate,
      members: fakeMembers,
      roomId,
      project: projectName,
    },
  ]);
});

it('Expect parseRoom ignore member events', () => {
  expect(fakeRoomsWithTarget(fakeMatrixUsers).map(parseRoom)).toEqual([
    {
      name: roomName,
      messages: [{ sender: fakeMembers[1], date: dates[1] }, { sender: fakeMembers[2], date: lastEventDate }],
      lastEventDate,
      members: fakeMembers,
      roomId,
      project: projectName,
    },
  ]);
});

it('Expect parseRoom ignore bot users', () => {
  expect(fakeRoomsWithBot(fakeMatrixUsers).map(parseRoom)).toEqual([
    {
      name: roomName,
      messages: [{ sender: fakeMembers[1], date: dates[1] }, { sender: fakeMembers[2], date: lastEventDate }],
      lastEventDate,
      members: fakeMembers,
      roomId,
      project: projectName,
    },
  ]);
});
