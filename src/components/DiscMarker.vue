<template>
    <marker
        :id="`DiscMarker_${color}`"
        viewBox="0 0 6 6"
        refX="3"
        refY="3"
        markerWidth="6"
        markerHeight="6"
        fill="white"
        :stroke="color"
    >
        <circle cx="3" cy="3" r="3" />
    </marker>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class DiscMarker extends Vue {
    @Prop(String) readonly color!: string;
}
</script>
