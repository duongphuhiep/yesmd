import { Graph } from "@/logic/graph";
import { Utils } from "@/logic/utils";

describe("Graph Test", () => {
    it("min distant", async () => {
        const g: Graph.YModel = (await import("tests/data-samples/simpleModel"))
            .default;
        const k1 = g.Kinds[0];
        const k2 = g.Kinds[1];
        k1.width = 200;
        k2.width = 300;
        expect(Graph.minDistant(k1, k2)).toEqual(250);
    });

    it("compute line linked 2 bounds", () => {
        const a: Utils.Rectangle = { x: 12, y: 10, width: 8, height: 4 };
        const b: Utils.Rectangle = { x: 0, y: 0, width: 10, height: 4 };
        const l = Utils.getLinkLine(a, b, 0);
    });
});
