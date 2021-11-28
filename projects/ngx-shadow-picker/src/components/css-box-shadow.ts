/**
 * imported from https://github.com/jxnblk/css-box-shadow/blob/master/index.js
 */

const VALUES_REG = /,(?![^(]*\))/;
const PARTS_REG = /\s(?![^(]*\))/;
const LENGTH_REG = /^[0-9]+[a-zA-Z%]+?$/;

export interface IBoxShadow {
    inset: boolean;
    offsetX: number | string;
    offsetY: number | string;
    blurRadius?: number | string;
    spreadRadius?: number | string;
    color?: string;
}

const parseValue = (str: string): IBoxShadow => {
    const parts = str.split(PARTS_REG);
    const inset = parts.includes('inset');
    const last = parts.slice(-1)[0];
    const color = !isLength(last) ? last : undefined;

    const nums = parts
        .filter((n) => n !== 'inset')
        .filter((n) => n !== color)
        .map(toNum);
    const [offsetX, offsetY, blurRadius, spreadRadius] = nums;

    return {
        inset,
        offsetX,
        offsetY,
        blurRadius,
        spreadRadius,
        color,
    };
};

const stringifyValue = (obj: IBoxShadow): string => {
    const { inset, offsetX = 0, offsetY = 0, blurRadius = 0, spreadRadius, color } = obj || {};

    return [inset ? 'inset' : null, offsetX, offsetY, blurRadius, spreadRadius, color]
        .filter((v) => v !== null && v !== undefined)
        .map(toPx)
        .map((s) => `${s}`.trim())
        .join(' ');
};

const isLength = (v: string): boolean => v === '0' || LENGTH_REG.test(v);
const toNum = (v: string): number | string => {
    if (!/px$/.test(v) && v !== '0') return v;
    const n = parseFloat(v);
    return !Number.isNaN(n) ? n : v;
};
const toPx = (n: number | string | undefined | null): string | number | undefined | null =>
    typeof n === 'number' && n !== 0 ? `${n}px` : n;

export const parse = (str: string): IBoxShadow[] =>
    str
        .split(VALUES_REG)
        .map((s) => s.trim())
        .map(parseValue);

export const stringify = (arr: IBoxShadow[]): string => arr.map(stringifyValue).join(', ');
