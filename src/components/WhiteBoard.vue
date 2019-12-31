<template>
    <canvas id="c" width="500" height="500" style="border:1px solid #ccc">
    </canvas>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { model, converter } from "@/logic/graph";
import { fabric } from "fabric";

@Component({
    //components: { Kind },
    props: {
        src: Object as () => model.YModel,
        kinds: Array as () => string[],
    },
})
export default class WhiteBoard extends Vue {
    buildGraphNode(k: model.Kind): fabric.Group {
        let rect = new fabric.Rect({
            fill: "yellow",
            width: 300,
            height: 100,
            strokeWidth: 1,
            stroke: "black",
        });

        let txtb = new fabric.Textbox("Table Name Example Box", {
            width: 300,
            textAlign: "center",
        });

        let group = new fabric.Group([rect, txtb], {
            left: 100,
            top: 100,
        });

        return group;
    }
}
</script>
