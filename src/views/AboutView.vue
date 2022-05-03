<template>
  <div class="about container">
    <h1 class="text-4xl">This is an about page</h1>
    <LifeCircle></LifeCircle>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LifeCircle from "@/components/life-circle";

export default defineComponent({
  name: "HomeView",
  components: {
    LifeCircle,
  },
});
</script>
