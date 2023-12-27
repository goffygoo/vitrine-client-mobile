import { MONTHS_LIST } from "../constants";

export const getDateStamp = dateObject => {
    return `${dateObject.getDate()} ${MONTHS_LIST[dateObject.getMonth()].slice(0, 3)}`;
}

export const getTimeStamp = dateObject => {
    return `${(dateObject.getUTCHours() % 12) || 12}:${dateObject.getMinutes() < 10 ? 0 : ""}${dateObject.getMinutes()} ${dateObject.getUTCHours() < 12 ? 'am' : 'pm'}`;
}