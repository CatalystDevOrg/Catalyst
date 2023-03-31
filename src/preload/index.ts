import {contextBridge, ipcRenderer} from "electron";
import {PreloadExports} from "../common/preloadExports";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let eventHandler = (...event: any[]) => { console.warn("No event handler was registered"); };

const preloadExports: PreloadExports = {
    platform: process.platform,
    handleEvent: (handler) => {
        eventHandler = handler;
    },
    window: {
        close: () => ipcRenderer.invoke("close"),
        restore: () => ipcRenderer.invoke("restore"),
        minimize: () => ipcRenderer.invoke("minimize"),
        maximize: () => ipcRenderer.invoke("maximize")
    },
    tab: {
        switch: (index: number) => ipcRenderer.invoke("switch-tab", index),
        goBack: () => ipcRenderer.invoke("go-back"),
        goForward: () => ipcRenderer.invoke("go-forward"),
        submitOmnibox: (input: string) => ipcRenderer.invoke("omnibox-submit", input)
    }
};

ipcRenderer.on("events", (event, ...args) => eventHandler(...args));

contextBridge.exposeInMainWorld("catalyst", preloadExports);