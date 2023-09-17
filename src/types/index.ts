export type IdType = string | number | null | undefined;
export interface ItemType {
  id: IdType;
  label: string;
}
export interface ErrorMessagesType {
  maximumReached: string;
  alreadyAdded: string;
  unavailableCharacters: string;
}
