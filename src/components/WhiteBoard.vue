<template>
    <svg
        class="WhiteBoard"
        width="500"
        height="500"
        style="border:1px solid #ccc"
    >
        <Kind :key="k.name" v-for="k in src.Kinds" :src="k"></Kind>
    </svg>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Kind from "@/components/Kind.vue";
import { Model } from "@/logic/graph";
import { Utils } from "@/logic/utils";

@Component({
    components: { Kind },
    props: {
        src: Object as () => Model.YModel,
        kinds: Array as () => string[],
    },
})
export default class WhiteBoard extends Vue {}
</script>
