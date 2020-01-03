<template>
    <svg
        class="WhiteBoard"
        width="500"
        height="500"
        style="border:1px solid #ccc"
    >
        <Kind :x="10" :y="10" :src="sampleKind"></Kind>
    </svg>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { model } from "@/logic/graph";
import Kind from "@/components/Kind.vue";

import fakeData from "@/../tests/data-samples/simpleModel.js";
import { Utils } from "../logic/utils";

let sampleData = fakeData.Kinds[0];
sampleData.name = "This is really a long name";

@Component({
    components: { Kind },
    props: {
        src: Object as () => model.YModel,
        kinds: Array as () => string[],
    },
})
export default class WhiteBoard extends Vue {
    sampleKind: model.Kind = sampleData;

    /* dragging: Utils.Draggable | null = null;
    lastPosition: Utils.ClientXY | null = null;
    startDrag(e: MouseEvent) {
        let elementToDrag = e.target as Node;
        console.log(elementToDrag.parentNode);
        while (elementToDrag && !Utils.isDraggable(elementToDrag)) {
            elementToDrag = elementToDrag.parentNode as Element;
        }
        this.dragging = elementToDrag as Utils.Draggable;
        if (this.dragging) this.dragging.startDrag(e);
    }
    drag(e: MouseEvent) {
        if (!this.dragging) return;
        if (this.lastPosition) {
            let dx = e.clientX - this.lastPosition.clientX;
            let dy = e.clientY - this.lastPosition.clientY;
        }
        this.lastPosition = e;
    }
    endDrag() {
        this.dragging = null;
        this.lastPosition = null;
    }

    onDrop() {
        console.log("drop");
    }
    onDragOver() {} */
}
</script>
