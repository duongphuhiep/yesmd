<template>
    <div class="Home">
        <WhiteBoard :src="graph"></WhiteBoard>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import WhiteBoard from "@/components/WhiteBoard.vue";

import fakeData from "@/../tests/data-samples/simpleModel.js";

@Component({
    components: { WhiteBoard },
})
export default class Home extends Vue {
    graph = fakeData;
}
</script>
