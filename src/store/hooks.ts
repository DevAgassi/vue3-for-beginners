import { getModule } from "vuex-module-decorators";
import { CounterModule, UserModule } from "./modules";
import { store } from "./store";

export const useCounterModule = () => getModule(CounterModule, store);
export const useUserModule = () => getModule(UserModule, store);
