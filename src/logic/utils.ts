//#region utils
export namespace Utils {
    export function round(
        p: number,
        n = 10,
        max: number | null = null
    ): number {
        let res = p % n < n / 2 ? p - (p % n) : p + n - (p % n);
        if (res < 0) res = 0;
        if (max && res >= max) res = max;
        return res;
    }
    export function direction(from: number, to: number): number {
        if (from == to) return 0;
        return from < to ? 1 : -1;
    }
    export interface ClientXY {
        clientX: number;
        clientY: number;
    }
    export interface Dimension {
        width?: number;
        height?: number;
    }

    export interface Bound extends Dimension {
        x?: number;
        y?: number;
    }

    export interface Line {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }
}
//#endregion
