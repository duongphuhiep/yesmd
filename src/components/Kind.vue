<template>
    <g
        class="Kind"
        @mousedown.prevent="dragStart"
        :transform="'translate(' + src.x + ' ' + src.y + ')'"
    >
        <rect
            :width="src.width"
            :height="src.height"
            :fill="color"
            stroke="black"
            stroke-width="2"
        ></rect>

        <text
            class="Label"
            :x="src.width / 2"
            :y="src.height / 2"
            dominant-baseline="middle"
            text-anchor="middle"
            text-rendering="geometricPrecision"
            ref="txt"
        >
            {{ src.name }}
        </text>
    </g>
</template>

<script lang="ts">
import { Vue, Prop, Component, Model } from "vue-property-decorator";
import { Graph } from "@/logic/graph";
import { Utils } from "@/logic/utils";
import * as d3 from "d3";

@Component
export default class Kind extends Vue {
    readonly PADDING: number = 20;

    @Prop(Object) readonly simulation!: d3.Simulation<Graph.Kind, undefined>;

    @Model("change", { type: Object })
    readonly src!: Graph.Kind;

    get color() {
        if (this.src.isLink) return "cyan";
        return "yellow";
    }

    mounted() {
        let textBoxSize = (this.$refs.txt as SVGTextElement).getBBox();
        this.src.width = Utils.round(
            textBoxSize.width + this.PADDING,
            this.PADDING
        );
        this.src.height = Utils.round(
            textBoxSize.height + this.PADDING,
            this.PADDING
        );
    }

    //#region Draggable

    dragging: boolean = false;
    dragCursorStartPos: Utils.ClientXY | null = null;
    dragOriginPos: Utils.ClientXY | null = null;
    dragRegionDim: Utils.Dimension | null = null;

    dragStart(e: MouseEvent): void {
        //find the canvas size
        let canvasNode = e.target as Node;
        while (canvasNode && !(canvasNode instanceof SVGSVGElement)) {
            canvasNode = canvasNode.parentNode as Node;
        }
        let canvas = canvasNode as SVGSVGElement;
        this.dragRegionDim = {
            width: canvas.clientWidth - (this.src.width || 0),
            height: canvas.clientHeight - (this.src.height || 0),
        };

        this.dragging = true;
        this.dragCursorStartPos = e;
        this.dragOriginPos = {
            clientX: this.src.x || 0,
            clientY: this.src.y || 0,
        };

        if (this.simulation) {
            this.simulation.alphaTarget(0.3).restart();
        }
        if (this.src) {
            this.src.fx = this.src.x;
            this.src.fy = this.src.y;
        }

        document.addEventListener("mousemove", this.drag);
        document.addEventListener("mouseup", this.drageEnd, { once: true });
    }

    drag(e: MouseEvent): void {
        if (
            this.dragging &&
            this.dragCursorStartPos &&
            this.dragOriginPos &&
            this.dragRegionDim
        ) {
            let x = Utils.round(
                this.dragOriginPos.clientX +
                    e.clientX -
                    this.dragCursorStartPos.clientX,
                this.PADDING,
                this.dragRegionDim.width
            );
            let y = Utils.round(
                this.dragOriginPos.clientY +
                    e.clientY -
                    this.dragCursorStartPos.clientY,
                this.PADDING,
                this.dragRegionDim.height
            );
            if (this.simulation) {
                this.src.fx = x;
                this.src.fy = y;
            } else {
                this.src.x = x;
                this.src.y = y;
            }
        }
    }

    drageEnd(e: MouseEvent): void {
        document.removeEventListener("mousemove", this.drag);
        document.removeEventListener("mouseup", this.drageEnd);
        this.dragging = false;
        this.dragCursorStartPos = null;

        if (this.simulation) {
            this.simulation.alphaTarget(0);
            this.src.fx = null;
            this.src.fy = null;
        }
    }

    //#endregion
}
</script>

<style lang="scss">
.Kind {
    .Label {
        font-family: arial;
        font-size: 25px;
        fill: black;
        white-space: pre;
    }
}
</style>
