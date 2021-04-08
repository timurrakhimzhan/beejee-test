import GlobalStore from "./global-store";
import {proxy, subscribe} from "valtio";

const store = proxy(new GlobalStore());

subscribe(store, () => {
    store.cache();
})

export default store;