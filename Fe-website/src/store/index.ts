import { createStore, Module, ModuleTree } from "vuex";
import type { RootState } from "./storeType";
import warehouse from "./modules/warehouse";
import personnel from "./modules/personnel";

const modules: ModuleTree<RootState> = {
    warehouse,
    personnel,
};

const root: Module<RootState, RootState> = {
    modules,
};

export const store = createStore<RootState>({
    ...root,
});

