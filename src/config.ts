import { getInput } from '@actions/core';

export enum Size {
  XS = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
}

export const SIZE_ORDER = [Size.XS, Size.S, Size.M, Size.L, Size.XL];

type ConfigEntry = {
  size: Size;
  diff: number;
  files: number;
  label: string;
};

export function parseConfig(): ConfigEntry[] {
  return SIZE_ORDER.map((size) => ({
    size,
    diff: parseInt(getInput(`${size}_diff`), 10),
    files: parseInt(getInput(`${size}_files`), 10),
    label: getInput(`${size}_label`),
  }));
}
