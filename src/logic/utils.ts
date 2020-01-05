export namespace Conf {
    export const GRID: number = 10;
    export const KIND_PADDING: number = 20;
}
//#region utils
export namespace Utils {
    export function diagonalLength(d: Utils.Dimension): number {
        return Math.sqrt((d.width || 0) ** 2 + (d.height || 0) ** 2);
    }
    /**
     * Sanp to grid. For example if the grid is 10 and the canvas size is 400 then
     * - round(32, 10, 400) = 30 (32 is snap to 30 in the grid)
     * - round(36, 10, 400) = 40 (36 is snap to 40 in the grid)
     * - round(566, 10, 400) = 40 (566 is outside the canvans size => snap it to the canvas size)
     * @export
     * @param {number} p is the current number to round
     * @param {number} [n=10] grid size
     * @param {(number | null)} [max=null] p can not exceed
     * @returns {number}
     */
    export function round(
        p: number,
        n = Conf.GRID,
        max: number | null = null
    ): number {
        let res = p % n < n / 2 ? p - (p % n) : p + n - (p % n);
        if (res < 0) res = 0;
        if (max && res >= max) res = max;
        return res;
    }

    /*     export function direction(from: number, to: number): number {
        if (from == to) return 0;
        return from < to ? 1 : -1;
    } */

    /**
     * @param b bound to convert
     * @param margin to add
     */
    function convertBoundToRectangleWithMargin(
        b: Bound,
        margin: number
    ): Rectangle {
        return {
            x: (b.x || 0) - margin,
            y: (b.y || 0) - margin,
            width: (b.width || 0) + margin * 2,
            height: (b.height || 0) + margin * 2,
        };
    }
    function getCentralPoint(r: Rectangle): Point {
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }
    function getLineIntersection(a: Line, b: Line): Point | null {
        const s1_x = a.p2.x - a.p1.x;
        const s1_y = a.p2.y - a.p1.y;
        const s2_x = b.p2.x - b.p1.x;
        const s2_y = b.p2.y - b.p1.y;
        const s =
            (-s1_y * (a.p1.x - b.p1.x) + s1_x * (a.p1.y - b.p1.y)) /
            (-s2_x * s1_y + s1_x * s2_y);
        const t =
            (s2_x * (a.p1.y - b.p1.y) - s2_y * (a.p1.x - b.p1.x)) /
            (-s2_x * s1_y + s1_x * s2_y);
        if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
            return { x: a.p1.x + t * s1_x, y: a.p1.y + t * s1_y };
        return null;
    }
    function getIntersections(r: Rectangle, l: Line): Point | null {
        const x2 = r.x + r.width;
        const y2 = r.y + r.height;
        const c1: Point = r;
        const c2: Point = { x: x2, y: r.y };
        const c3: Point = { x: x2, y: y2 };
        const c4: Point = { x: r.x, y: y2 };

        for (let border of [
            { p1: c1, p2: c2 },
            { p1: c2, p2: c3 },
            { p1: c3, p2: c4 },
            { p1: c4, p2: c1 },
        ]) {
            let p = getLineIntersection(border, l);
            if (p) return p;
        }

        return null;
    }
    /**
     * Get a line link the centrals of the 2 givens bounds.
     * The end points of the line will be somewhre on border of the bounds with a small margin (2px)
     * @param a
     * @param b
     */
    export function getLinkLine(
        a: Bound,
        b: Bound,
        margin: number
    ): Line | null {
        const ar = convertBoundToRectangleWithMargin(a, 0);
        const br = convertBoundToRectangleWithMargin(b, margin);
        const p1 = getCentralPoint(ar);
        const p2 = getCentralPoint(br);

        const baseLine: Line = { p1, p2 };

        const mp1 = getIntersections(ar, baseLine);
        const mp2 = getIntersections(br, baseLine);
        if (mp1 && mp2) return { p1: mp1, p2: mp2 };
        return null;
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
        p1: Point;
        p2: Point;
    }

    export interface Point {
        x: number;
        y: number;
    }

    export interface Rectangle extends Point {
        width: number;
        height: number;
    }
}
//#endregion
