<template>
  <AppBlog></AppBlog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppBlog from "@/components/app-blog";

export default defineComponent({
  name: "AppBlogView",
  components: {
    AppBlog,
  },
});
</script>
