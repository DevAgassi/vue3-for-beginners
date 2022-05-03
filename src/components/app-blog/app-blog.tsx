import { defineComponent, onMounted, reactive } from "vue";
import { Post, State } from "@/model";
import { useFetch } from "@vueuse/core";

export default defineComponent({
  name: "AppBlog",
  setup: function () {
    const state: State = reactive({
      isLoading: false,
      hasError: false,
      errorMessage: "",
      posts: null,
    });
    const posts: Post[] | null = [];

    onMounted(async () => {
      state.isLoading = true;
      try {
        const { error, data } = await useFetch(
          "https://jsonplaceholder.typicode.com/posts"
        )
          .get()
          .json();
        if (error.value) {
          throw new Error(error.value);
        }
        console.log(error.value, data.value);
        state.posts = data.value;
      } catch (error: unknown) {
        const typedError = error as Error;
        state.hasError = true;
        state.errorMessage = typedError.message;
      } finally {
        state.isLoading = false;
      }
    });

    return {
      posts,
      state,
    };
  },
  render() {
    return (
      <section class="container flex-wrap flex pt-20 lg:pt-[40px] pb-10 lg:pb-20 bg-[#F3F4F6]">
        <div> {this.state.hasError ? "Error" : ""}</div>
        {this.state.posts?.map((post: Post) => (
          <article key={post.id} class="w-full sm:w-1 md:w-1/2 xl:w-1/3 px-4">
            <div class="bg-white rounded-lg overflow-hidden mb-10">
              <a
                title={post.name}
                href={`https://jsonplaceholder.typicode.com/posts/${post.id}`}
              >
                <img
                  src={`https://picsum.photos/id/${post.id}/300/200`}
                  alt={post.name}
                  class="w-full"
                />
              </a>
              <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                <h3>{post.name}</h3>
                <p class="text-base text-body-color leading-relaxed mb-7">
                  {post.body}
                </p>
                View Details
              </div>
            </div>
          </article>
        ))}
      </section>
    );
  },
});
