import PageMetadata from "./PageMetadata";

export type IpcEvents = {
    "tabs-updated": (tabData: {
        selected: number,
        tabs: PageMetadata[]
    }) => void,
    "window-state-changed": (state: { maximized: boolean }) => void
}

export type PreloadExports = {
    platform: NodeJS.Platform,
    handleEvent: (handler: (...args: any[]) => any) => void,
    window: {
        close: () => void,
        restore: () => void,
        minimize: () => void,
        maximize: () => void
    },
    tab: {
        switch: (index: number) => void,
        goBack: () => void,
        goForward: () => void,
        submitOmnibox: (input: string) => void
    }
}

export function getExports(): PreloadExports {
    return (<Window & typeof global & { catalyst: PreloadExports }>window).catalyst;
}

const preloadExports = getExports();

export default preloadExports;