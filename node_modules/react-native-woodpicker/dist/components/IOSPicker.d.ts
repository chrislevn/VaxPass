import type { PickerItem } from "../types";
import { Animated, ViewStyle, GestureResponderEvent } from "react-native";
export declare type Props = {
    selectedItem: any;
    disabled?: boolean;
    show: boolean;
    title?: string;
    renderInput: () => JSX.Element;
    renderDoneBar: () => JSX.Element;
    renderPickerItems: () => Array<JSX.Element>;
    onItemChange: (item: PickerItem, index: number) => void;
    togglePicker: (event: GestureResponderEvent) => void;
    containerStyle?: ViewStyle;
    animationValue: Animated.Value;
    customProps: {
        [key: string]: any;
    };
};
declare const IOSPicker: ({ selectedItem, disabled, show, title, renderInput, renderDoneBar, renderPickerItems, onItemChange, togglePicker, containerStyle, animationValue, customProps, }: Props) => JSX.Element;
export default IOSPicker;
