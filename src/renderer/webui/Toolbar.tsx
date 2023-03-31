import {Component, createRef, FormEvent, ReactNode} from "react";

import "../styles/components/Toolbar.module.scss";
import rendererEventEmitter from "../rendererEventEmitter";
import classNames from "classnames";
import preloadExports from "../../common/preloadExports";

export default class Toolbar extends Component<object, { omniboxValue: string, canGoBack: boolean, canGoForward: boolean, key: number }> {
    private readonly omniboxRef = createRef<HTMLInputElement>();
    
    public constructor() {
        super({});

        this.state = {
            omniboxValue: "",
            canGoBack: false,
            canGoForward: false,
            key: Date.now()
        };
    }

    public render(): ReactNode {
        return (
            <div id={"toolbar"}>
                <div id={"history"} className={"icon-group"}>
                    <i
                        className={classNames("material-icons round", { "inactive": !this.state.canGoBack })}
                        onClick={() => preloadExports.tab.goBack()}>arrow_back_ios</i>
                    <i
                        className={classNames("material-icons round", { "inactive": !this.state.canGoForward })}
                        onClick={() => preloadExports.tab.goForward()}>arrow_forward_ios</i>
                </div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input
                        type={"text"}
                        id={"omnibox"}
                        placeholder={"Search or type a URL"}
                        defaultValue={this.state.omniboxValue}
                        ref={this.omniboxRef}
                        key={this.state.key}/>
                </form>
                <div className={"icon-group"}>
                    <i className={"material-icons round"}>refresh</i>
                    <i className={"material-icons inactive"}>more_vert</i>
                    <i className={"material-icons round inactive"}>bookmarks</i>
                </div>
            </div>
        );
    }

    public componentDidMount(): void {
        rendererEventEmitter.on("tabs-updated", tabData => {
            const selectedTab = tabData.tabs[tabData.selected];

            this.setState({
                omniboxValue: selectedTab.url,
                canGoForward: selectedTab.canGoForward,
                canGoBack: selectedTab.canGoBack,
                key: Date.now()
            });
        });
    }

    private handleSubmit(ev: FormEvent<HTMLFormElement>): void {
        ev.preventDefault();

        if (!this.omniboxRef.current) return;

        preloadExports.tab.submitOmnibox(this.omniboxRef.current.value);
    }
}