import type { GestureResponderEvent } from "react-native";
export declare type DoneBarProps = {
    title?: string;
    doneButtonLabel?: string;
    onDonePress: (event: GestureResponderEvent) => void;
};
