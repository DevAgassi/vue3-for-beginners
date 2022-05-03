import { InjectionKey } from "vue";
import { createStore } from "vuex";
import { CounterModule, UserModule } from "./modules";

export const store = createStore({
  modules: {
    counter: CounterModule,
    user: UserModule,
  },
});

export type Store = typeof store;

export const key: InjectionKey<Store> = Symbol();
