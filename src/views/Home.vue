<template>
    <div class="home">
        <!--
        <FabricSample></FabricSample>
        <PouchSample></PouchSample>-->
        <WhiteBoard></WhiteBoard>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// import FabricSample from "@/components/FabricSample.vue";
// import PouchSample from "@/components/PouchSample.vue";
import WhiteBoard from "@/components/WhiteBoard.vue";

@Component({
    components: { /* FabricSample, PouchSample, */ WhiteBoard },
})
export default class Home extends Vue {}
</script>
