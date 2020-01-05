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
import { Graph, Utils } from "@/logic";

@Component
export default class Relation extends Vue {
    readonly MARGIN: number = 8;
    @Prop(Object) readonly src!: Graph.Relation;
    get color() {
        let source = this.src.source as Graph.Kind;
        if (source && source.isLink) return "blue";
        return "red";
    }
    get l(): Utils.Line {
        const source = this.src.source as Utils.Bound;
        const target = this.src.target as Utils.Bound;
        let resu: Utils.Line | null = null;
        if (source && target) {
            resu = Utils.getLinkLine(source, target, this.MARGIN);
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
