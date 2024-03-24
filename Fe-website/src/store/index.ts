import { createStore, Module, ModuleTree } from "vuex";
import type { RootState } from "./storeType";

const modules: ModuleTree<RootState> = {

};

const root: Module<RootState, RootState> = {
    modules,
};

export const store = createStore<RootState>({
    ...root,
});

