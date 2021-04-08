import UserStore from "./user/user-store";
import {LS_CACHE_KEY, LS_TOKEN_KEY} from "../constants";
import BaseStore from "./base-store";
import TasksStore from "./tasks/tasks-store";

export default class GlobalStore extends BaseStore {
    user: UserStore = new UserStore();
    tasks: TasksStore = new TasksStore();
    dontCache = ['tasks'];

    constructor() {
        super();
        this.loadFromCache();
    }

    cache() {
        const cached = JSON.stringify(this);
        localStorage.setItem(LS_CACHE_KEY, cached);
    }

    private assignStoreToCache(store: BaseStore, cachedStore: any) {
        Object.entries(cachedStore).forEach(([key, valueCached]: [string, any]) => {
            if (!store.hasOwnProperty(key) || store.dontCache.includes(key)) {
                return;
            }
            const valueInStore = (store as any)[key]
            if (valueInStore instanceof BaseStore) {
                return this.assignStoreToCache(valueInStore, valueCached);
            }
            (store as any)[key] = valueCached;
        })
    }

    loadFromCache() {
        const cached = localStorage.getItem(LS_CACHE_KEY);
        if(!cached) {
            return;
        }
        const cachedObj = JSON.parse(cached);
        this.assignStoreToCache(this, cachedObj);
    }

    removeFromCache() {
        localStorage.removeItem(LS_CACHE_KEY);
        localStorage.removeItem(LS_TOKEN_KEY);
    }
}