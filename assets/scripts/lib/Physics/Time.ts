export type Time = number;

export const millisecond: Time = 1;
export const second: Time = 1000 * millisecond;
export const minute: Time = 60 * second;
export const hour: Time = 60 * minute;
export const day: Time = 24 * hour;
export const week: Time = 7 * day;
