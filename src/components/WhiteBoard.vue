<template>
    <svg
        class="WhiteBoard"
        :width="width"
        :height="height"
        style="border:1px solid #ccc"
    >
        <defs>
            <!-- arrowhead marker definition -->
            <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
            >
                <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
            <!-- circle marker definition -->
            <marker
                id="disc"
                viewBox="0 0 6 6"
                refX="3"
                refY="3"
                markerWidth="6"
                markerHeight="6"
                fill="white"
                stroke="black"
                orient="auto"
            >
                <circle cx="3" cy="3" r="3" />
            </marker>
        </defs>
        <Relation :key="r.id" v-for="r in src.Relations" :src="r"></Relation>
        <Kind
            :key="k.id"
            v-for="k in src.Kinds"
            :src="k"
            :simulation="simulation"
        ></Kind>
    </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Kind from "@/components/Kind.vue";
import Relation from "@/components/Relation.vue";
import { Graph } from "@/logic/graph";
import { Utils } from "@/logic/utils";
import * as d3 from "d3";

@Component({
    components: { Kind, Relation },
})
export default class WhiteBoard extends Vue {
    @Prop(Object) readonly src!: Graph.YModel;
    //g: Graph.YModelDetail = Graph.buildDetail(this.src);
    /* get g(): Graph.YModelDetail {
        return Graph.buildDetail(this.src);
    } */
    width: number = 1000;
    height: number = 800;

    simulation: d3.Simulation<Graph.Kind, undefined> = d3
        .forceSimulation(this.src.Kinds)
        .force("center", d3.forceCenter(this.width / 2, this.height / 2))
        .force("link", d3.forceLink(this.src.Relations))
        .force(
            "charge",
            d3
                .forceManyBody()
                .distanceMin(40)
                .distanceMax(this.width)
        )
        .force("collide", d3.forceCollide(100));
    mounted(): void {
        this.simulation.stop();
        this.simulation = d3
            .forceSimulation(this.src.Kinds)
            .force("center", d3.forceCenter(this.width / 2, this.height / 2))
            .force(
                "link",
                d3.forceLink(this.src.Relations).distance(l => {
                    let source = l.source as Graph.Kind;
                    let target = l.target as Graph.Kind;
                    let d = 0;
                    if (source && target) {
                        d = Graph.minDistant(source, target);
                    }
                    return d == 0 ? 50 : d + 40;
                })
            )
            .force(
                "charge",
                d3
                    .forceManyBody()
                    .strength(-120)
                    .distanceMin(120)
                    .distanceMax(this.width)
            )
            .force("collide", d3.forceCollide(100));

        this.simulation.on("end", () => {
            this.src.Kinds.forEach(k => {
                k.x = Utils.round(k.x || 0, 10, this.width);
                k.y = Utils.round(k.y || 0, 10, this.width);
            });
        });

        //this.simulation.tick(4000);
        this.simulation.restart();
    }
}
</script>
