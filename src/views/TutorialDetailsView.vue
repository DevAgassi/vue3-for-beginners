<template>
  <div class="container pt-5">
    <suspense>
      <template #default>
        <tutorial-details />
      </template>
      <template #fallback> Loading ... </template>
    </suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TutorialDetails from "@/components/tutorial/TutorialDetails";

export default defineComponent({
  name: "TutorialDetailsView",
  components: { TutorialDetails },
});
</script>
