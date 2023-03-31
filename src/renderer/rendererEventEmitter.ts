import {EventEmitter} from "events";
import preloadExports, {IpcEvents} from "../common/preloadExports";
import TypedEventEmitter from "typed-emitter";

const rendererEventEmitter = <TypedEventEmitter<IpcEvents>>new EventEmitter();

preloadExports.handleEvent(<T extends keyof IpcEvents>(event: T, ...params: Parameters<IpcEvents[T]>) => {
    rendererEventEmitter.emit(event, ...params);
});

export default rendererEventEmitter;