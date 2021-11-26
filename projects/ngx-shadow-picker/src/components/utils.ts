import type { ShadowOffsetUnit, ShadowPickerParams, ShadowPosition } from '../types';

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

export const parseShadowString = (value: string): ShadowPickerParams | null => {
    const parts = value.replace(/ {2}/gi, ' ').trim().split(' ');
    let position: ShadowPosition = 'outside';

    if (parts[0] === 'inset') {
        parts.shift();
        position = 'inside';
    }

    if (parts.length === 3) {
        const [x, y, color] = parts;
        return { offset: { x, y }, color, position };
    }

    if (parts.length === 4) {
        const [x, y, blur, color] = parts;
        return { offset: { x, y }, color, blur, position };
    }

    if (parts.length === 5) {
        const [x, y, blur, spread, color] = parts;
        return { offset: { x, y }, color, spread, blur, position };
    }

    return null;
};

export const buildShadowString = (params: ShadowPickerParams): string => {
    const values = [
        params.position === 'inside' ? 'inset' : undefined,
        params.offset?.x || '0',
        params.offset?.y || '0',
        params.blur,
        params.spread,
        params.color || '#000000',
    ].filter((p) => !!p);

    return values.join(' ');
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

// <T extends (...args: any) => any>(func: T, wait?: number, options?: DebounceSettings): DebouncedFunc<T>

export function debounce<T extends (...args: any) => any>(func: T, timeout = 300): T {
    let timer: ReturnType<typeof setTimeout>;
    return ((...args: any): any => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, timeout);
    }) as T;
}
