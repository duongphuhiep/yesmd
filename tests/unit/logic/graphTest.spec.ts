import { model, BuildDagreGraph } from "@/logic/graph.ts";
import dagre from "dagre";

describe("GraphTest", () => {
    it("build the graph", async () => {
        try {
            let simpleModel: model.YModel = (
                await import("tests/data-samples/simpleModel.js")
            ).default;
            let g = BuildDagreGraph(simpleModel);
            expect(g.edgeCount()).toEqual(1);
            expect(g.nodeCount()).toEqual(2);
            expect(g.node("user").width).toBeLessThan(g.node("group").width);
        } catch (err) {
            console.error(err);
        }
    });

    it("layout the graph", async () => {
        
        try {
            let simpleModel: model.YModel = (
                await import("tests/data-samples/simpleModel.js")
            ).default;
            let g = BuildDagreGraph(simpleModel);

            dagre.layout(g);
            
            g.nodes().forEach(function(v: string) {
                console.log("Node " + v + ": ", g.node(v));
           });
        } catch (err) {
            console.error(err);
        }
    });
});