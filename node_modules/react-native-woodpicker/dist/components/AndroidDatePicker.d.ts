import { ViewStyle } from "react-native";
import { Display, Mode } from "../types/datepicker";
export declare type Props = {
    value: Date;
    show: boolean;
    mode?: Mode;
    disabled?: boolean;
    display?: Display;
    renderInput: () => JSX.Element;
    containerStyle?: ViewStyle | undefined;
    neutralButtonLabel?: string;
    onChange: (_: any, newDate?: Date | undefined) => void;
};
declare const AndroidDatePicker: ({ show, disabled, renderInput, containerStyle, ...pickerProps }: Props) => JSX.Element;
export default AndroidDatePicker;
