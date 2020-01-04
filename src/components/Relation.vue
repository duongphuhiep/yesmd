<template>
    <line
        class="Relation"
        :x1="l.x1"
        :y1="l.y1"
        :x2="l.x2"
        :y2="l.y2"
        :stroke="color"
    ></line>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { Graph } from "@/logic/graph";
import { Utils } from "@/logic/utils";

@Component
export default class Relation extends Vue {
    @Prop(Object) readonly src!: Graph.Relation;

    get color() {
        let source = this.src.source as Graph.Kind;
        if (source && source.isLink) return "cyan";
        return "red";
    }
    get l(): Utils.Line {
        let source = this.src.source as Graph.Kind;
        let target = this.src.target as Graph.Kind;

        if (source && target) {
            let cw = (source.width || 0) / 2;
            let ch = (source.height || 0) / 2;
            let pw = (target.width || 0) / 2;
            let ph = (target.height || 0) / 2;
            let cx = (source.x || 0) + cw;
            let cy = (source.y || 0) + ch;
            let px = (target.x || 0) + pw;
            let py = (target.y || 0) + ph;

            let dx = Utils.direction(cx, px);
            let dy = Utils.direction(cy, py);

            return {
                x1: cx,
                y1: cy,
                x2: px,
                y2: py,
            };
            /* return {
                x1: cx + dx * cw,
                y1: cy + dy * ch,
                x2: px - dx * pw,
                y2: py - dy * ph,
            }; */
        }
        return { x1: 0, y1: 0, x2: 0, y2: 0 };
    }
}
</script>

<style lang="scss">
.Relation {
    stroke-width: 2;
}
</style>
