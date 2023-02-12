import { action } from "mobx";

class actions {
    static deps = {};

    on = (type, handler) => {
        actions.deps[type] = actions.deps[type] ? actions.deps[type]: [];
        actions.deps[type].push(handler);
    };

    emit = (type, data) => {
        actions.deps[type] instanceof Array && actions.deps[type].forEach(fn => fn(data));
    }

}

export default new actions()