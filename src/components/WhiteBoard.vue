<template>
    <svg
        class="WhiteBoard"
        :width="width"
        :height="height"
        style="border:1px solid #ccc"
    >
        <defs>
            <ArrowMarker color="red"></ArrowMarker>
            <DiscMarker color="red"></DiscMarker>
            <ArrowMarker color="blue"></ArrowMarker>
            <DiscMarker color="blue"></DiscMarker>
            <ArrowMarker color="black"></ArrowMarker>
            <DiscMarker color="black"></DiscMarker>
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
import ArrowMarker from "@/components/ArrowMarker.vue";
import DiscMarker from "@/components/DiscMarker.vue";
import { Graph, Utils } from "@/logic";
import * as d3 from "d3";

@Component({
    components: { Kind, Relation, ArrowMarker, DiscMarker },
})
export default class WhiteBoard extends Vue {
    @Prop(Object) readonly src!: Graph.YModel;
    //g: Graph.YModelDetail = Graph.buildDetail(this.src);
    /* get g(): Graph.YModelDetail {
        return Graph.buildDetail(this.src);
    } */
    width: number = 1000;
    height: number = 800;

    simulation = Graph.buildD3ForceSimulation(this.src, {
        width: this.width,
        height: this.height,
    });
    mounted(): void {
        if (this.simulation != null) this.simulation.stop();
        this.simulation = Graph.buildD3ForceSimulation(this.src, {
            width: this.width,
            height: this.height,
        });
        if (this.simulation != null) this.simulation.restart();
    }
}
</script>
