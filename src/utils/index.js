import { groupBy, mapValues, head, last, get } from 'lodash/fp';
import url from 'url';

const protocol = 'https';
const matrixHost = 'matrix';
const bots = process.env.REACT_APP_BOTS.split(' ');

// export const isEnglish = val => /[\w]/.test(val);

export const getMatrixHostName = domain => [matrixHost, domain].join('.');

export const getBaseUrl = domain => url.format({ protocol, hostname: getMatrixHostName(domain) });

export const getUserId = (userName, domain) => `@${userName}:${getMatrixHostName(domain)}`;

export const getRoomsUsersCount = rooms =>
  rooms.map(({ members }) => members.length) |> groupBy(x => x) |> mapValues(arr => arr.length) |> Object.entries;

const getProjectName = name => {
  const [h, tail] = name.split('-');

  return tail && h;
};

const getId = matrixId => matrixId.slice(1).split(':') |> head;

/**
 * @param {matrixSdk.Room} room matrix room
 * @returns {{name: string, roomId: string, members: string[], project: string, messages: {sender: string, date: string}[]}}
 */
export const parseRoom = room => {
  const { name } = room;
  const messages = room.timeline
    .filter(e => !e.target)
    .filter(e => !bots.some(bot => e.getSender().includes(bot)))
    .map(e => ({
      date: e.getDate(),
      sender: getId(e.getSender()),
    }));
  const members = room.getJoinedMembers().map(({ userId }) => getId(userId));
  const lastEventDate = last(messages) |> get('date');

  return {
    name,
    messages,
    lastEventDate,
    members,
    roomId: room.roomId,
    project: getProjectName(name),
  };
};
