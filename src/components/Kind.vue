<template>
    <g class="Kind" :transform="'translate(' + x + ' ' + y + ')'">
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
import { Vue, Prop, Component } from "vue-property-decorator";
import { model } from "@/logic/graph";

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
    textBoxSize: model.Dimension = {
        width: 0,
        height: 0,
    };

    get realWidth() {
        return this.width || this.textBoxSize.width + this.PADDING;
    }
    get realHeight() {
        return this.height || this.textBoxSize.height + this.PADDING;
    }
    get centerX() {
        return (this.x || 0) + this.realWidth / 2;
    }
    get centerY() {
        return (this.y || 0) + this.realHeight / 2;
    }

    mounted() {
        this.textBoxSize = (this.$refs.txt as SVGTextElement).getBBox();
        console.log(this.textBoxSize, this.realWidth);
    }
}
</script>

<style lang="scss">
.Kind {
    .Label {
        font-family: arial;
        font-size: 25px;
        fill: #000000;
        white-space: pre;
    }
}
</style>
