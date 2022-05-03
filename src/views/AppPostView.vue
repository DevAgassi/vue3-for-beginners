<template>
  <AppPost></AppPost>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppPost from "@/components/app-post";

export default defineComponent({
  name: "AppPostView",
  components: {
    AppPost,
  },
});
</script>
