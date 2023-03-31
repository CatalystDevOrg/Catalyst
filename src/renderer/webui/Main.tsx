import {Component, ReactNode} from "react";
import TabBar from "./tabs/TabBar";
import Toolbar from "./Toolbar";

export default class Main extends Component {
    public render(): ReactNode {
        return (
            <>
                <TabBar/>
                <Toolbar/>
            </>
        );
    }
}