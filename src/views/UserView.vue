<template>
  <div class="container">
    <suspense>
      <template #default>
        <UserName />
      </template>
      <template #fallback> Loading ... </template>
    </suspense>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import UserName from "@/components/user-name";
import { useUserModule } from "@/store";

export default defineComponent({
  name: "UserView",
  components: {
    UserName,
  },
});
</script>
