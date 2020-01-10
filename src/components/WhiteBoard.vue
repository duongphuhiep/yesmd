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
            :ismultlink="src.IsMultiLink(k)"
            :d3flayout="d3flayout"
            :colaflayout="colaflayout"
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
import * as cola from "webcola";

@Component({
    components: { Kind, Relation, ArrowMarker, DiscMarker },
})
export default class WhiteBoard extends Vue {
    @Prop(Object) readonly src!: Graph.YModelXY;
    //g: Graph.YModelDetail = Graph.buildDetail(this.src);
    /* get g(): Graph.YModelDetail {
        return Graph.buildDetail(this.src);
    } */
    width: number = 1000;
    height: number = 800;

    d3flayout: Graph.D3FLayout = null;
    colaflayout: Graph.ColaFLayout = null;

    initD3FLayout() {
        if (this.d3flayout != null) this.d3flayout.stop();
        this.d3flayout = Graph.buildD3FLayout(this.src, {
            width: this.width,
            height: this.height,
        });
        if (this.d3flayout != null) this.d3flayout.restart();
    }

    initColaFLayout() {
        if (this.colaflayout != null) this.colaflayout.stop();
        this.colaflayout = Graph.buildColaFLayout(this.src, {
            width: this.width,
            height: this.height,
        });
        if (this.colaflayout != null) {
            this.colaflayout.start(30);
        }
    }

    mounted(): void {
        this.initColaFLayout();
    }
}
</script>
