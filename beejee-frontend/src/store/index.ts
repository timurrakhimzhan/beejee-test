import GlobalStore from "./global-store";
import {proxy, subscribe} from "valtio";

const store = proxy(new GlobalStore());

subscribe(store.user, () => {
    store.cache();
})

export default store;