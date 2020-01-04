<template>
    <svg
        class="WhiteBoard"
        :width="width"
        :height="height"
        style="border:1px solid #ccc"
    >
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
    width: number = 500;
    height: number = 500;
    get simulation() {
        return d3
            .forceSimulation(this.src.Kinds)
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
            .force("charge", d3.forceManyBody().distanceMin(40))
            .force("center", d3.forceCenter(this.width / 2, this.height / 2));
    }
    mounted(): void {}
}
</script>
