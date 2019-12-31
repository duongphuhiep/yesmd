import Vue from "vue";
import { model } from "@/logic/graph.ts";

interface Props {
    src: {
        type: model.Kind;
        required: true;
    };
}
export default Vue.component<Props>("Kind", {
    functional: true,
    render(h, ctx) {
        console.log("props", ctx.props);
        return h();
        /* return createElement(
            "div",
            {
                attrs: {
                    class: "ImKind",
                },
            },
            ["hahah"],
        ); */
    },
});

/* import { Vue, Component } from "vue-property-decorator";
import { fabric } from "fabric";

@Component
export class Kind extends Vue {
    functional: true,
    render(createElement) {
        var canvas = new fabric.Canvas("c");

        // create a rectangle object
        var rect = new fabric.Rect({
            fill: "yellow",
            width: 300,
            height: 100,
            strokeWidth: 3,
            stroke: "red",
        });

        var txtb = new fabric.Textbox("Table Name Example Box", {
            width: 300,
            textAlign: "center",
        });

        var group = new fabric.Group([rect, txtb], {
            left: 10,
            top: 10,
        });
        canvas.add(group);
        return createElement("s");
    }
}
 */
