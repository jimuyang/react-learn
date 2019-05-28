import { stringify } from "querystring";

const LocalStorageKey = 'rngine_flow_data';

const saveFlow = (data) => {
    localStorage.setItem(LocalStorageKey, JSON.stringify(data));
}

const loadFlow = () => {
    try {
        return JSON.parse(localStorage.getItem(LocalStorageKey));
    } catch (e) {
        return null;
    }
}

export default { saveFlow, loadFlow }

