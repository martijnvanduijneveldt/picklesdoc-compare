export interface IEquals<T> {
  equals(other: T): boolean;
}

export function isIEquals<T>(object: any): object is IEquals<T> {
  return object.equals !== undefined;
}
