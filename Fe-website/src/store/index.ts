import { createStore, Module, ModuleTree } from "vuex";
import type { RootState } from "./storeType";
import personnel from "./modules/personnel";
import producer from "./modules/producer";
import classify from "./modules/classify";
import category from "./modules/category";
import product from "./modules/product";
import dashboard from "./modules/dashboard";
import report from "./modules/report";
import warehouse from "./modules/warehouse";

const modules: ModuleTree<RootState> = {
    personnel,
    producer,
    classify,
    category,
    product,
    dashboard,
    report,
    warehouse
};

const root: Module<RootState, RootState> = {
    modules,
};

export const store = createStore<RootState>({
    ...root,
});

