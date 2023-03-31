import {BrowserView, BrowserWindow, Rectangle, screen, WebContents} from "electron";
import {EventEmitter} from "events";
import * as constants from "../constants";
import TypedEventEmitter from "typed-emitter";
import Main from "../index";
import PageMetadata from "../../common/PageMetadata";
import { URL } from "url";

type Events = {
    "metadata-updated": (metadata: PageMetadata) => void;
};

export default class OpenTab extends (EventEmitter as new () => TypedEventEmitter<Events>){
    private readonly view: BrowserView;
    private readonly window: BrowserWindow;
    private readonly metadata: PageMetadata;

    private initialBounds: Rectangle;
    private fullscreenBounds: Rectangle;

    public constructor(url: string, window: BrowserWindow) {
        super();

        this.metadata = {
            url,
            icon: "",
            title: url,
            loadProgress: 0,
            canGoBack: false,
            canGoForward: false
        }

        this.window = window;
        this.view = new BrowserView({
            webPreferences: {

            }
        });

        this.view.setBackgroundColor("000000");
        void this.view.webContents.loadURL(url);

        this.initialBounds = {
            x: 0,
            y: constants.TOP_VIEW_PADDING,
            width: window.getBounds().width,
            height: window.getBounds().height - constants.TOP_VIEW_PADDING
        };

        this.fullscreenBounds = {
            x: 0,
            y: 0,
            width: window.getBounds().width,
            height: window.getBounds().height
        };

        this.view.setBounds(this.initialBounds);

        this.view.setAutoResize({
            width: true,
            height: true
        });

        const handleUrlUpdate = () => {
            this.metadata.url = this.view.webContents.getURL();

            this.metadata.canGoBack = this.view.webContents.canGoBack();
            this.metadata.canGoForward = this.view.webContents.canGoForward();

            this.updateMetadata();
        }

        this.view.webContents.on("enter-html-full-screen", () => {
            this.view.setBounds(this.fullscreenBounds);
            this.window.setTopBrowserView(this.view);
        });

        this.view.webContents.on("leave-html-full-screen", () => {
            this.view.setBounds(this.initialBounds);
            this.window.setTopBrowserView(Main.getInstance().getTopView());
        });

        this.view.webContents.on("did-navigate", handleUrlUpdate);
        this.view.webContents.on("did-frame-navigate", () => {
            try {
                const currentUrl = new URL(this.view.webContents.getURL());
                const oldUrl = new URL(this.metadata.url);

                if (currentUrl.host !== oldUrl.host) {
                    this.metadata.title = this.view.webContents.getURL();
                }
            } catch {
                // ignored
            }

            handleUrlUpdate();
        });
        this.view.webContents.on("did-navigate-in-page", handleUrlUpdate);

        this.view.webContents.on("page-title-updated", () => {
            this.metadata.title = this.view.webContents.getTitle();
            this.updateMetadata();
        });
        this.view.webContents.on("page-favicon-updated", (event, favicons) => {
            this.metadata.icon = favicons[0];
            this.updateMetadata();
        });

        this.view.webContents.setWindowOpenHandler(details => {
            switch (details.disposition) {
                case "background-tab":
                    Main.getInstance().openTab(details.url);
                    break;
                case "foreground-tab":
                    Main.getInstance().openTab(details.url);
                    break;
                case "new-window":
                    Main.getInstance().openNewWindow(details.url);
                    break;
            }

            return { action: "deny" };
        });

        window.on("resize", () => {
            const windowBounds = window.getBounds();
            const windowScreen = screen.getDisplayNearestPoint({x: windowBounds.x, y: windowBounds.y});

            this.initialBounds = {
                x: 0,
                y: constants.TOP_VIEW_PADDING,
                width: Math.min(windowBounds.width, windowScreen.bounds.width),
                height: Math.min(windowBounds.height - constants.TOP_VIEW_PADDING, windowScreen.bounds.height - constants.TOP_VIEW_PADDING)
            };

            this.fullscreenBounds = {
                x: 0,
                y: 0,
                width: Math.min(windowBounds.width, windowScreen.bounds.width),
                height: Math.min(windowBounds.height, windowScreen.bounds.height)
            };

            this.view.setBounds(this.initialBounds);
        });
    }

    public getWebContents(): WebContents {
        return this.view.webContents;
    }

    public navigate(url: string): void {
        this.view.webContents.loadURL(url);
    }

    public setActive(): void {
        const topView = Main.getInstance().getTopView();

        this.window.setBrowserView(null);

        this.window.addBrowserView(this.view);
        this.window.addBrowserView(topView);

        this.window.setTopBrowserView(topView);
    }

    public close(): void {
        this.removeAllListeners();
    }

    public getMetadata(): PageMetadata {
        return this.metadata;
    }

    private updateMetadata(): void {
        this.emit("metadata-updated", this.metadata);
    }
}