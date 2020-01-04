<template>
    <svg
        class="WhiteBoard"
        width="500"
        height="500"
        style="border:1px solid #ccc"
    >
        <Relation :key="r.id" v-for="r in src.Relations" :src="r"></Relation>
        <Kind :key="k.id" v-for="k in src.Kinds" :src="k"></Kind>
    </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Kind from "@/components/Kind.vue";
import Relation from "@/components/Relation.vue";
import { Graph } from "@/logic/graph";
import { Utils } from "@/logic/utils";

@Component({
    components: { Kind, Relation },
})
export default class WhiteBoard extends Vue {
    @Prop(Object) readonly src!: Graph.YModelDetail;
    //g: Graph.YModelDetail = Graph.buildDetail(this.src);
    /* get g(): Graph.YModelDetail {
        return Graph.buildDetail(this.src);
    } */
}
</script>
