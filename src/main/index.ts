import {app, BrowserView, BrowserWindow, screen} from "electron";
import path from "path";
import OpenTab from "./pages/OpenTab";
import * as constants from "./constants";
import {IpcEvents} from "../common/preloadExports";
import {URL} from "url";

export default class Main {
    private static instance: Main;

    private window!: BrowserWindow;
    private topView!: BrowserView;

    private openTabs: OpenTab[] = [];
    private selectedTab = 0;

    private constructor() {
        Main.instance = this;

        this.createWindow()
            .then(() => this.openTab("https://duckduckgo.com/"));
    }

    public static main() {
        new Main();
    }

    private async createWindow() {
        const window = new BrowserWindow({
            frame: !["win32", "darwin"].includes(process.platform),
            show: false,
            title: "Catalyst"
        });

        const topView = new BrowserView({
            webPreferences: {
                preload: path.join(__dirname, "../preload/index.js")
            }
        });

        await topView.webContents.loadFile(path.join(__dirname, "../renderer/index.htm"));

        topView.setBounds({
            x: 0,
            y: 0,
            width: window.getBounds().width,
            height: constants.TOP_VIEW_PADDING
        });

        topView.setAutoResize({
            width: true,
            height: false
        });

        topView.webContents.openDevTools({ mode: "detach" });
        topView.webContents.on("did-finish-load", () => {
            this.sendTabs();
            this.emitEvent("window-state-changed", { maximized: window.isMaximized() })
        });

        topView.webContents.ipc.handle("close", () => {
            this.window.close();
        });

        topView.webContents.ipc.handle("restore", () => {
            this.window.restore();
        });

        topView.webContents.ipc.handle("maximize", () => {
            this.window.maximize();
        });

        topView.webContents.ipc.handle("minimize", () => {
            this.window.minimize();
        });

        topView.webContents.ipc.handle("switch-tab", (_, index: number) => {
            this.selectedTab = index;
            this.openTabs[index].setActive();
            this.sendTabs();
        });

        topView.webContents.ipc.handle("go-back", () => {
            const webContents = this.getTab(this.selectedTab).getWebContents();

            if (webContents.canGoBack()) webContents.goBack();
        });

        topView.webContents.ipc.handle("go-forward", () => {
            const webContents = this.getTab(this.selectedTab).getWebContents();

            if (webContents.canGoForward()) webContents.goForward();
        });

        topView.webContents.ipc.handle("omnibox-submit", (_, input: string) => {
            try {
                new URL(input);

                this.getTab(this.selectedTab).navigate(input);
            } catch {
                this.getTab(this.selectedTab).navigate(`https://duckduckgo.com/?q=${encodeURI(input)}`)
            }
        });

        window.setBrowserView(topView);
        window.show();

        window.on("maximize", () => {
            this.emitEvent("window-state-changed", { maximized: true });

            const windowBounds = window.getBounds();
            const windowScreen = screen.getDisplayNearestPoint({x: windowBounds.x, y: windowBounds.y});
            const viewBounds = this.topView.getBounds();

            this.topView.setBounds({ x: 0, y: 0, width: windowScreen.bounds.width, height: viewBounds.height });
        });

        window.on("unmaximize", () => {
            this.emitEvent("window-state-changed", { maximized: false });

            const windowBounds = window.getBounds();
            const viewBounds = this.topView.getBounds();

            this.topView.setBounds({ x: 0, y: 0, width: windowBounds.width, height: viewBounds.height });
        });

        this.window = window;
        this.topView = topView;

        this.sendTabs();
    }

    public sendTabs() {
        this.emitEvent("tabs-updated", {
            selected: this.selectedTab,
            tabs: this.openTabs.map(tab => tab.getMetadata())
        });
    }

    public openNewWindow(url: string): void {
        const window = new BrowserWindow();

        void window.loadURL(url);
    }

    public openTab(url: string, setActive = true): void {
        const tab = new OpenTab(url, this.window);

        this.selectedTab = this.openTabs.length;

        if (setActive) {
            tab.setActive();
        }

        tab.on("metadata-updated", () => {
            this.sendTabs();
        });

        this.openTabs.push(tab);
        this.sendTabs();
    }

    public closeTab(tab: OpenTab): void;
    public closeTab(index: number): void;
    public closeTab(tabOrIndex: number | OpenTab): void {
        if (typeof tabOrIndex === "number") {
            this.openTabs[tabOrIndex].close();
            this.openTabs[tabOrIndex].removeAllListeners();
            this.openTabs.splice(tabOrIndex, 1);
        } else {
            const index = this.openTabs.findIndex(tab => tab === tabOrIndex);

            if (index !== -1) {
                tabOrIndex.close();
                tabOrIndex.removeAllListeners();
                this.openTabs.splice(index, 1);
            }
        }

        if (this.openTabs.length === 0) {
            app.exit(0);
            return;
        }

        this.selectedTab = this.selectedTab >= this.openTabs.length ? this.openTabs.length - 1 : this.selectedTab;
        this.sendTabs();
    }

    public getTab(index: number): OpenTab {
        return this.openTabs[index];
    }

    public getTopView(): BrowserView {
        return this.topView;
    }

    public emitEvent<E extends keyof IpcEvents>(channel: E, ...params: Parameters<IpcEvents[E]>): void {
        this.topView.webContents.send("events", channel, ...params);
    }

    public static getInstance(): Main {
        return Main.instance;
    }
}

app.once("ready", Main.main);