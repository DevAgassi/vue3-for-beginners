import { defineComponent, provide, ref, watchEffect } from "vue";
import { ConfigInjectionKey, UpdateConfigModeInjectionKey } from "./symbols";
import { Config, Mode } from "@/model";

export default defineComponent({
  name: "ConfigProvider",
  setup() {
    const config = ref<Config>({
      mode: Mode.Light,
    });
    const html = document.querySelector("html");
    const updateConfigMode = (mode: Mode) => {
      config.value.mode = mode;
    };
    provide(ConfigInjectionKey, config);
    provide(UpdateConfigModeInjectionKey, updateConfigMode);

    watchEffect(() => {
      html?.removeAttribute("class");
      html?.classList.add(config.value.mode);
    });

    return {
      config,
    };
  },
  render() {
    return this.$slots.default?.();
  },
});
