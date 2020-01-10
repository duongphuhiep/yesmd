import { Graph } from "@/logic/graph";
import { Utils } from "@/logic/utils";

describe("Graph Test", () => {
    it("min distant", async () => {
        const g: Graph.YModel = (await import("tests/data-samples/simple"))
            .default;
        const k1 = g.Kinds[0];
        const k2 = g.Kinds[1];
        k1.width = 200;
        k2.width = 300;
        expect(Graph.minDistant(k1, k2)).toEqual(250);
    });

    it("compute graph detail", () => {
        const g1: Graph.YModelCompact = {
            Kinds: ["k0", "k1", "-k2-", "k3", { id: "k4" }, "k5"],
            Relations: [
                "k0:k1",
                "k2:k1",
                "k2:k3",
                { id: "k2:k4", source: "k2", target: "k4" },
                "k5:k4:4",
                "k6:k5:2",
                "k0:k6"
            ],
        };

        const gg1 = Graph.buildDetailFromCompact(g1);

        //kind object created
        expect(gg1.Kinds[0].id).toEqual("k0");
        expect(gg1.IsMultiLink(gg1.Kinds[0])).toBe(true);

        //basic relation object
        expect(gg1.Relations[0].source).toEqual(gg1.Kinds[0]);
        expect(gg1.Relations[0].target).toEqual(gg1.Kinds[1]);
        expect(gg1.Relations[0].type).toEqual(Graph.RelationType.Normal);

        //link kind shortcut
        expect(gg1.Kinds[2].id).toEqual("k2");
        expect(gg1.Kinds[2].isLink).toBe(true);
        expect(gg1.Relations[3].source).toEqual(gg1.Kinds[2]);
        expect(gg1.Relations[3].target).toEqual(gg1.Kinds[4]);

        //name is id by default if not defined
        expect(gg1.Kinds[4].name).toEqual("k4");
        
        //extension link
        expect(gg1.Relations[4].type).toEqual(Graph.RelationType.Extension);
        
        //create new kind from the relation
        expect(gg1.Kinds[6].id).toEqual("k6");
        expect(gg1.Relations[5].source).toEqual(gg1.Kinds[6]);
        expect(gg1.Relations[5].target).toEqual(gg1.Kinds[5]);
        expect(gg1.Relations[5].type).toEqual(Graph.RelationType.UniqueOptional);
    });
});
