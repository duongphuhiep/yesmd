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
import { model, converter } from "@/logic/graph";
import Kind from "@/components/Kind.vue";

import fakeData from "@/../tests/data-samples/simpleModel.js";

let sampleData = fakeData.Kinds[0];
//sampleData.name = "This is really a long";

@Component({
    components: { Kind },
    props: {
        src: Object as () => model.YModel,
        kinds: Array as () => string[],
    },
})
export default class WhiteBoard extends Vue {
    sampleKind: model.Kind = sampleData;
}
</script>
