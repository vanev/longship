import { Observable, Observer } from "./Observable";

export type State<T> = [Observable<T>, Update<T>];

export type Update<T> = (update: (t: T) => T) => void;

export const state = <T>(initial: T): State<T> => {
  let value: T = initial;
  let observers: Array<Observer<T>> = [];

  const update: Update<T> = (updater) => {
    value = updater(value);
    observers.forEach((observer) => observer(value));
  };

  const observable: Observable<T> = (observer) => {
    observers.push(observer);
  };

  return [observable, update];
};
