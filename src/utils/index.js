import { groupBy, mapValues } from 'lodash/fp';
import moment from 'moment';
import url from 'url';

const protocol = 'https';
const matrixHost = 'matrix';

export const getLimitTimestamp = limit =>
  moment()
    .subtract(limit, 'months')
    .valueOf();

export const getLastRealSenderEvent = (events, ignoreUsers) =>
  events.reverse().find(ev => !(ignoreUsers || []).some(user => ev.getSender().includes(user)));

export const SLICE_AMOUNT = 25;

export const isEnglish = val => /[\w]/.test(val);

export const getMatrixHostName = domain => [matrixHost, domain].join('.');

export const parseRoom = ignoreUsers => ({ roomId, name: roomName, timeline }) => {
  const lastEvent = getLastRealSenderEvent(timeline, ignoreUsers);
  if (!lastEvent) {
    return;
  }
  const timestamp = lastEvent.getTs();
  const date = lastEvent.getDate();

  return { roomName, roomId, timestamp, date };
};

export const getOutdatedRooms = limit => ({ timestamp }) => timestamp < getLimitTimestamp(limit);

export const getBaseUrl = domain => url.format({ protocol, hostname: getMatrixHostName(domain) });

export const getUserId = (userName, domain) => `@${userName}:${getMatrixHostName(domain)}`;

export const getRoomsLastUpdate = (rooms, limit, ignoreUsers) =>
  rooms
    .map(parseRoom(ignoreUsers))
    .filter(Boolean)
    .filter(getOutdatedRooms(limit))
    .sort((el1, el2) => el2.timestamp - el1.timestamp);

export const getRoomsUsersCount = rooms =>
  rooms.map(r => r.currentState.getMembers().length)
  |> groupBy(x => x)
  |> mapValues(arr => arr.length)
  |> Object.entries;
