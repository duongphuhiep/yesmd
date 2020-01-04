import { Graph } from "@/logic/graph";

describe("Graph Test", () => {
    it("min distant", async () => {
        let g: Graph.YModel = (await import("tests/data-samples/simpleModel"))
            .default;
        let k1 = g.Kinds[0];
        let k2 = g.Kinds[1];
        k1.width = 200;
        k2.width = 300;
        expect(Graph.minDistant(k1, k2)).toEqual(250);
    });
});
