<template>
    <g
        class="Kind"
        @mousedown.prevent="startDrag"
        :transform="'translate(' + realX + ' ' + realY + ')'"
    >
        <rect
            :width="realWidth"
            :height="realHeight"
            fill="yellow"
            stroke="black"
            stroke-width="2"
        ></rect>

        <text
            class="Label"
            :x="realWidth / 2"
            :y="realHeight / 2"
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
/*        @mousemove="drag"
        @mouseup="endDrag"*/
import { Vue, Prop, Component } from "vue-property-decorator";
import { model } from "@/logic/graph";
import { Utils } from "@/logic/utils";

@Component({
    props: {
        src: Object as () => model.Kind,
    },
})
export default class Kind extends Vue {
    readonly PADDING: number = 20;
    @Prop(Number) readonly x!: number | null;
    @Prop(Number) readonly y!: number | null;
    @Prop(Number) readonly width!: number | null;
    @Prop(Number) readonly height!: number | null;
    //@Prop(Object) readonly src!: model.Kind;

    realX: number = this.x || 0;
    realY: number = this.x || 0;
    textBoxSize: Utils.Dimension = {
        width: 0,
        height: 0,
    };

    get realWidth() {
        return this.width || Utils.round(this.textBoxSize.width + this.PADDING);
    }
    get realHeight() {
        return (
            this.height || Utils.round(this.textBoxSize.height + this.PADDING)
        );
    }
    get centerX() {
        return (this.realX || 0) + this.realWidth / 2;
    }
    get centerY() {
        return (this.realY || 0) + this.realHeight / 2;
    }

    mounted() {
        this.textBoxSize = (this.$refs.txt as SVGTextElement).getBBox();
    }

    //#region Draggable

    dragging: boolean = false;
    dragCursorStartPos: Utils.ClientXY | null = null;
    dragOriginPos: Utils.ClientXY | null = null;
    dragRegionDim: Utils.Dimension | null = null;

    startDrag(e: MouseEvent): void {
        //find the canvas size
        let canvasNode = e.target as Node;
        while (canvasNode && !(canvasNode instanceof SVGSVGElement)) {
            canvasNode = canvasNode.parentNode as Node;
        }
        let canvas = canvasNode as SVGSVGElement;
        this.dragRegionDim = {
            width: canvas.clientWidth - this.realWidth,
            height: canvas.clientHeight - this.realHeight,
        };

        this.dragging = true;
        this.dragCursorStartPos = e;
        this.dragOriginPos = { clientX: this.realX, clientY: this.realY };
        document.addEventListener("mousemove", this.drag);
        document.addEventListener("mouseup", this.endDrag, { once: true });
    }

    drag(e: MouseEvent): void {
        if (
            this.dragging &&
            this.dragCursorStartPos &&
            this.dragOriginPos &&
            this.dragRegionDim
        ) {
            this.realX = Utils.round(
                this.dragOriginPos.clientX +
                    e.clientX -
                    this.dragCursorStartPos.clientX,
                this.PADDING,
                this.dragRegionDim.width,
            );
            this.realY = Utils.round(
                this.dragOriginPos.clientY +
                    e.clientY -
                    this.dragCursorStartPos.clientY,
                this.PADDING,
                this.dragRegionDim.height,
            );
        }
    }

    endDrag(e: MouseEvent): void {
        document.removeEventListener("mousemove", this.drag);
        document.removeEventListener("mouseup", this.endDrag);
        this.dragging = false;
        this.dragCursorStartPos = null;
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
