import colorLib from '@kurkle/color';

import { parse, stringify } from './css-box-shadow';
import type { ShadowOffsetUnit, ShadowPickerParams } from '../types';

export const unitRegex = /(-?\d+)((r?em)|(px)|%)$/;

export function useOffsetUnit(
    { x, y }: ShadowPickerParams['offset'] = { x: '0', y: '0' },
): ShadowOffsetUnit {
    const xData = useUnitValue(x);
    const yData = useUnitValue(y);
    return {
        x: xData.amount,
        xUnit: xData.unit,
        y: yData.amount,
        yUnit: yData.unit,
    };
}

export function useUnitValue(value: string): {
    amount: number;
    unit: string;
} {
    const defRes = {
        amount: 0,
        unit: 'px',
    };

    if ([undefined, null, ''].includes(value)) return defRes;
    const matches = `${value}`.match(unitRegex);

    if (matches?.length === 5) {
        return {
            amount: parseInt(matches[1], 10),
            unit: matches[2],
        };
    }
    return defRes;
}

function toPx(value?: string | number): string {
    if (![undefined, null, '', 0].includes(value as string) && !Number.isNaN(value)) {
        return `${value}px`;
    }
    return value as string;
}

export const parseShadowString = (value: string): ShadowPickerParams | null => {
    const parseResult = parse(value);
    if (parseResult && parseResult.length) {
        const [{ inset, offsetX, offsetY, blurRadius, spreadRadius }] = parseResult;
        let [{ color }] = parseResult;
        if (!/^#[A-F0-9a-f]{1,8}$/.test(color || '')) {
            const colorData = colorLib(color as string);
            if (colorData.valid) {
                color = colorData.hexString() as string;
            }
        }
        return {
            blur: `${toPx(blurRadius || 0)}`,
            spread: `${toPx(spreadRadius || 0)}`,
            offset: {
                x: `${toPx(offsetX || 0)}`,
                y: `${toPx(offsetY || 0)}`,
            },
            position: inset ? 'inside' : 'outside',
            color,
        };
    }
    return null;
};

export const buildShadowString = (params: ShadowPickerParams): string => {
    return stringify([
        {
            inset: params.position === 'inside',
            blurRadius: params.blur,
            offsetX: params.offset?.x || '0',
            offsetY: params.offset?.y || '0',
            spreadRadius: params.spread,
            color: params.color || '#000000',
        },
    ]);
};

export interface IColorState {
    alpha: number;
    color: string;
}

export function parseHexColor(value: string): IColorState | null {
    const match = value.match(/#(?<hex>[0-9A-F]{6,8})/i) as any;
    const hex = match?.groups?.hex;
    if (hex) {
        let alpha = 255;
        if (hex.length === 8) {
            alpha = parseInt(hex.substr(6, 2), 16);
        }
        return { alpha, color: `#${hex.substr(0, 6)}` };
    }
    return null;
}

export function debounce<T extends (...args: any) => any>(func: T, timeout = 300): T {
    let timer: ReturnType<typeof setTimeout>;
    return ((...args: any): any => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, timeout);
    }) as T;
}
