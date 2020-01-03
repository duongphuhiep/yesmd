//#region utils
export namespace Utils {
    export function round(
        p: number,
        n = 10,
        max: number | null = null,
    ): number {
        let res = p % n < n / 2 ? p - (p % n) : p + n - (p % n);
        if (res < 0) res = 0;
        if (max && res >= max) res = max;
        return res;
    }
    export interface ClientXY {
        clientX: number;
        clientY: number;
    }
    export interface Dimension {
        width: number;
        height: number;
    }
}
//#endregion
