import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
    it("renders props.msg when passed", () => {
        const msg = "new message";
        const wrapper = shallowMount(HelloWorld, {
            propsData: { msg },
        });
        expect(wrapper.find("#msg").text()).toMatch(msg);
    });

    it("import samples data", async () => {
        let simpleModel: any = (await import("tests/data-samples/sample1.js"))
            .default;
        //console.log(simpleModel);
        expect(simpleModel.Kinds[0].id).toEqual("group");
    });
});
