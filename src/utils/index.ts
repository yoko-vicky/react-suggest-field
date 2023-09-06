export const formatStr = (str: string) =>
  str
    .trim()
    .replaceAll(/\s{2,}/g, ' ')
    .toLowerCase();

export const formatLabelToStore = (str: string) =>
  str.trim().replaceAll(/\s{2,}/g, ' ');

export const formatValueToStore = (str: string) =>
  str
    .trim()
    .replaceAll(/\s{2,}/g, ' ')
    .replaceAll(' ', '-')
    .toLowerCase();

export const formatStrToFilter = (str: string) =>
  str.replaceAll(' ', '').toLowerCase();

export const DEFAULT_INPUT_REGEX = /[A-Za-z0-9\s]/;
