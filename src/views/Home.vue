<template>
  <div class="home">
    <PouchSample></PouchSample>
    <FabricSample></FabricSample>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FabricSample from "@/components/FabricSample.vue";
import PouchSample from "@/components/PouchSample.vue";

@Component({
  components: { FabricSample, PouchSample },
})
export default class Home extends Vue {}
</script>
