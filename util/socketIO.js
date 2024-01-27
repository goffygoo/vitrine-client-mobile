import io from "socket.io-client";
import config from '../config.json';
import { SECURE_STORAGE_KEY, SOCKET_EVENTS, STORAGE_KEY } from "../constants";
import { auth_request } from "./service";
import { getItem, getSecureItem, setSecureItem } from "./storage";
import { setAccessToken } from "../redux/authReducer";
import listenChatEvents from "./chat";

const { SERVER } = config;

let socket;

const listenAllEvents = (dispatch, listen) => {
  listenChatEvents(dispatch, listen)
};

export const initConnection = (dispatch, props) => {
  const { accessToken } = props;
  socket = io(SERVER, {
    auth: {
      accessToken,
    },
  });

  socket.on(SOCKET_EVENTS.CONNECTION_ERROR, async (_e) => {
    const refreshToken = await getSecureItem(SECURE_STORAGE_KEY.REFRESH_TOKEN);
    const userId = await getItem(STORAGE_KEY.USER_ID);
    auth_request(
      'post',
      '/api/auth/access/newAccessToken',
      {
        refreshToken,
        userId
      },
      async ({ data }) => {
        await setSecureItem(SECURE_STORAGE_KEY.ACCESS_TOKEN, data.accessToken);
        dispatch(setAccessToken(data.accessToken));
      },
      () => undefined,
    )
  });

  listenAllEvents(dispatch, listen);
};

export const disconnect = () => {
  socket.disconnect();
};

export const emit = (event, data) => {
  if (!socket || !socket.connected) return false;
  socket.emit(event, data);
  return true;
};

export const listen = (event, action) => {
  socket.on(event, action);
};

export const emitForcefully = (event, data) => {
  if (!socket || !socket.connected)
    return setTimeout(() => {
      emitForcefully(event, data);
    }, 1000);

  socket.emit(event, data);
};

export const isConnected = () => {
  return socket && socket.connected;
};
