<template>
    <div class="FabricSample">
        <canvas
            id="c"
            width="500"
            height="500"
            style="border:1px solid #ccc"
        ></canvas>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { fabric } from "fabric";

@Component
export default class FabricSample extends Vue {
    mounted() {
        var canvas = new fabric.Canvas("c");

        // create a rectangle object
        var rect = new fabric.Rect({
            fill: "yellow",
            width: 300,
            height: 100,
            strokeWidth: 3,
            stroke: "black",
        });

        var txtb = new fabric.Textbox("Table Name Example Box", {
            width: 300,
            textAlign: "center",
        });

        var group = new fabric.Group([rect, txtb], {
            left: 100,
            top: 100,
        });
        canvas.add(group);
    }
}
</script>
