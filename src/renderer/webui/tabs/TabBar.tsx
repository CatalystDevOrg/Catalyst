import {Component, ReactNode} from "react";
import preloadExports from "../../../common/preloadExports";
import PageMetadata from "../../../common/PageMetadata";
import rendererEventEmitter from "../../rendererEventEmitter";

import "../../styles/components/TabBar.module.scss";
import Tab from "./Tab";

const inWindowTitlebar = ["win32", "darwin"].includes(preloadExports.platform);

class CloseButton extends Component {
    public render(): ReactNode {
        if (preloadExports.platform === "win32") {
            return (
                <div className={"window-control"} id={"close"} onClick={() => preloadExports.window.close()}>
                    <svg width={11} height={11} viewBox={"0 0 11 11"} fill={"none"}>
                        <path
                            d={"M6.279 5.5L11 10.221l-.779.779L5.5 6.279.779 11 0 10.221 4.721 5.5 0 .779.779 0 5.5 4.721 10.221 0 11 .779 6.279 5.5z"}/>
                    </svg>
                </div>
            );
        } else {
            return <div className={"window-control"} id={"close"} onClick={() => preloadExports.window.close()}/>;
        }
    }
}

class MaximizeButton extends Component<object, { maximized: boolean }> {
    public constructor() {
        super({});

        this.state = {
            maximized: false
        };
    }

    public render(): ReactNode {
        if (preloadExports.platform === "win32") {
            return (
                <div className={"window-control"} id={"maximize"} onClick={() => this.state.maximized ? preloadExports.window.restore() : preloadExports.window.maximize()}>
                    <svg width={11} height={11} viewBox={"0 0 11 11"} fill={"none"}>
                        {this.state.maximized ?
                            <path
                                d={"M11 8.798H8.798V11H0V2.202h2.202V0H11v8.798zm-3.298-5.5h-6.6v6.6h6.6v-6.6zM9.9 1.1H3.298v1.101h5.5v5.5h1.1v-6.6z"}/>
                            : <path d={"M11 0v11H0V0h11zM9.899 1.101H1.1V9.9h8.8V1.1z"}/>}
                    </svg>
                </div>
            );
        } else {
            return <div className={"window-control"} id={"maximize"} onClick={() => this.state.maximized ? preloadExports.window.restore() : preloadExports.window.maximize()}/>;
        }
    }

    public componentDidMount(): void {
        rendererEventEmitter.on("window-state-changed", state => {
            this.setState({ maximized: state.maximized });
        });
    }
}

class MinimizeButton extends Component {
    public render(): ReactNode {
        if (preloadExports.platform === "win32") {
            return (
                <div className={"window-control"} id={"minimize"} onClick={() => preloadExports.window.minimize()}>
                    <svg width={11} height={11} viewBox={"0 0 11 11"} fill={"none"}>
                        <path d={"M11 4.399V5.5H0V4.399h11z"}/>
                    </svg>
                </div>
            );
        } else {
            return <div className={"window-control"} id={"minimize"} onClick={() => preloadExports.window.minimize()}/>;
        }
    }
}

export default class TabBar extends Component<object, {selected: number, tabs: PageMetadata[]}> {
    public constructor() {
        super({});

        this.state = {
            selected: 0,
            tabs: []
        };
    }

    public render(): ReactNode {
        return (
            <div id={"tab-bar"}>
                {inWindowTitlebar ? (preloadExports.platform === "win32" ?
                    <div id={"window-controls"} className={"windows"}>
                        <CloseButton/>
                        <MaximizeButton/>
                        <MinimizeButton/>
                    </div> :
                    <div id={"window-controls"} className={"macos"}>
                        <CloseButton/>
                        <MinimizeButton/>
                        <MaximizeButton/>
                    </div>) : null
                }
                <div id={"tabs"}>
                    {this.state.tabs.map((tab, index) => {
                        return <Tab tabData={tab} active={index === this.state.selected} key={index} index={index}></Tab>
                    })}
                </div>
            </div>
        );
    }

    public componentDidMount() {
        rendererEventEmitter.on("tabs-updated", tabData => {
            this.setState(tabData);
        });
    }
}