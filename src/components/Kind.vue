<template>
    <g
        class="Kind"
        @mousedown.prevent="dragStart"
        :transform="`translate(${left},${top})`"
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
import { Graph, Utils, Conf } from "@/logic";
import * as cola from "webcola";

@Component
export default class Kind extends Vue {
    @Prop(Object) readonly d3flayout: Graph.D3FLayout = null;
    @Prop(Object) readonly colaflayout: Graph.ColaFLayout = null;
    @Prop(Boolean) readonly ismultilink!: boolean;

    @Model("change", { type: Object })
    readonly src!: Graph.KindXY;

    get color(): string {
        if (this.src.isLink) return "cyan";
        if (this.ismultilink) return "green";
        return "yellow";
    }

    get left(): number {
        if (this.src.width && this.src.x) {
            return this.src.x - this.src.width / 2;
        }
        return 0;
    }

    get top(): number {
        if (this.src.height && this.src.y) {
            return this.src.y - this.src.height / 2;
        }
        return 0;
    }

    mounted() {
        let textBoxSize = (this.$refs.txt as SVGTextElement).getBBox();
        this.src.width = Utils.round(
            textBoxSize.width + Conf.KIND_PADDING,
            Conf.KIND_PADDING
        );
        this.src.height = Utils.round(
            textBoxSize.height + Conf.KIND_PADDING,
            Conf.KIND_PADDING
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
        const canvas = canvasNode as SVGSVGElement;
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

        if (this.d3flayout) {
            this.d3flayout.alphaTarget(0.3).restart();
            if (this.src) {
                this.src.fx = this.src.x;
                this.src.fy = this.src.y;
            }
        }
        if (this.colaflayout) {
            this.colaflayout.alpha(0.3).start();
            cola.Layout.dragStart(this.src);
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
            const x = Utils.round(
                this.dragOriginPos.clientX +
                    e.clientX -
                    this.dragCursorStartPos.clientX,
                Conf.GRID,
                this.dragRegionDim.width
            );
            const y = Utils.round(
                this.dragOriginPos.clientY +
                    e.clientY -
                    this.dragCursorStartPos.clientY,
                Conf.GRID,
                this.dragRegionDim.height
            );
            if (this.d3flayout) {
                this.src.fx = x;
                this.src.fy = y;
            } else {
                this.src.x = x;
                this.src.y = y;

                if (this.colaflayout) {
                    this.colaflayout.start(10);
                    cola.Layout.drag(this.src, { x, y });
                }
            }
        }
    }

    drageEnd(e: MouseEvent): void {
        document.removeEventListener("mousemove", this.drag);
        document.removeEventListener("mouseup", this.drageEnd);
        this.dragging = false;
        this.dragCursorStartPos = null;

        if (this.d3flayout) {
            this.d3flayout.alphaTarget(0);
            this.src.fx = null;
            this.src.fy = null;
        }
        if (this.colaflayout) {
            this.colaflayout.alpha(0);
            cola.Layout.dragEnd(this.src);
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
