<template>
    <line class="Relation" :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2"></line>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { Graph } from "@/logic/graph";
import { Utils } from "@/logic/utils";

@Component
export default class Relation extends Vue {
    @Prop(Object) readonly src!: Graph.RelationDetail;
    get l(): Utils.Line {
        if (this.src && this.src.childDetail && this.src.parentDetail) {
            let cw = this.src.childDetail.width / 2;
            let cx = this.src.childDetail.x + cw;
            let ch = this.src.childDetail.height / 2;
            let cy = this.src.childDetail.y + ch;

            let pw = this.src.parentDetail.width / 2;
            let px = this.src.parentDetail.x + pw;
            let ph = this.src.parentDetail.height / 2;
            let py = this.src.parentDetail.y + ph;

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
    stroke: red;
    stroke-width: 2;
}
</style>
