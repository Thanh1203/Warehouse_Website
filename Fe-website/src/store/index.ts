import { createStore, Module, ModuleTree } from "vuex";
import type { RootState } from "./storeType";
import warehouse from "./modules/warehouse";
import personnel from "./modules/personnel";
import producer from "./modules/producer";
import classify from "./modules/classify";
import category from "./modules/category";
import product from "./modules/product";
import dashboard from "./modules/dashboard";

const modules: ModuleTree<RootState> = {
    warehouse,
    personnel,
    producer,
    classify,
    category,
    product,
    dashboard,
};

const root: Module<RootState, RootState> = {
    modules,
};

export const store = createStore<RootState>({
    ...root,
});

