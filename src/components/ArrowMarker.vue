<template>
    <marker
        :id="`ArrowMarker_${color}`"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto"
        :fill="color"
    >
        <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ArrowMarker extends Vue {
    @Prop(String) readonly color!: string;
}
</script>
