import { defineComponent, Ref, ref } from "vue";
import { Post } from "@/model";

export default defineComponent({
  name: "AppPost",
  setup: function () {
    const post: Ref<Post[]> = ref([]);
    return {
      post,
    };
  },
  render() {
    return (
      <section class="container flex-wrap flex pt-20 lg:pt-[40px] pb-10 lg:pb-20 bg-[#F3F4F6]">
        Test
      </section>
    );
  },
});
