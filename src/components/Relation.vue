<template>
    <line
        class="Relation"
        :x1="l.p1.x"
        :y1="l.p1.y"
        :x2="l.p2.x"
        :y2="l.p2.y"
        :stroke="color"
        :marker-start="`url(#DiscMarker_${color})`"
        :marker-end="`url(#ArrowMarker_${color})`"
    ></line>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { Graph, Utils, Conf } from "@/logic";
import { type } from "os";

@Component
export default class Relation extends Vue {
    @Prop(Object) readonly src!: Graph.Relation;
    get color(): string {
        if (this.src.type == Graph.RelationType.Extension) return "black";
        let source = this.src.source as Graph.Kind;
        if (source && source.isLink) return "blue";
        return "red";
    }
    get l(): Utils.Line {
        const source = this.src.source as Utils.CentralBound;
        const target = this.src.target as Utils.CentralBound;
        let resu: Utils.Line | null = null;
        if (source && target) {
            resu = Utils.getLinkLine(source, target, Conf.HALF_GRID);
        }
        return resu || { p1: { x: 0, y: 0 }, p2: { x: 0, y: 0 } };
    }
}
</script>

<style lang="scss">
.Relation {
    stroke-width: 2;
}
</style>
