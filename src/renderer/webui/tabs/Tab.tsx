import PageMetadata from "../../../common/PageMetadata";
import {Component, ReactNode} from "react";
import preloadExports from "../../../common/preloadExports";
import classNames from "classnames";

import "../../styles/components/TabBar.module.scss";

type Props = {
    tabData: PageMetadata,
    active: boolean,
    index: number
}

export default class Tab extends Component<Props, { icon: string | null }> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            icon: null
        };
    }

    public render(): ReactNode {
        return (
            <div className={classNames("tab", { "active": this.props.active })} onClick={() => preloadExports.tab.switch(this.props.index)}>
                {this.state.icon ?
                    <img src={this.state.icon} alt={""}/> :
                    <i className={"material-icons round"}>public</i>
                }<span>{this.props.tabData.title ?? this.props.tabData.url}</span>
            </div>
        );
    }

    public componentDidMount() {
        void this.updateTabIcon();
    }

    public componentDidUpdate(prevProps: Readonly<{ tabData: PageMetadata }>) {
        if (prevProps.tabData.icon !== this.props.tabData.icon) {
            void this.updateTabIcon();
        }
    }

    private async updateTabIcon() {
        if (!this.props.tabData.icon) {
            this.setState({
                icon: null
            });

            return;
        }

        const iconRequest = await fetch(this.props.tabData.icon).catch(() => undefined);

        if (iconRequest && iconRequest.ok) {
            console.log("Icon exists");

            this.setState({
                icon: this.props.tabData.icon
            });
        } else {
            console.log("No icon");

            this.setState({
                icon: null
            });
        }
    }
}