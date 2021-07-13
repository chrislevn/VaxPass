import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { styles } from "../helpers/stylesHelper";
const InputButton = ({ resetValue, togglePicker, style, text, textInputStyle, touchableStyle, isNullable, isCompactHiddenPickerNeeded, renderHiddenCompactIOSPicker, }) => {
    return (React.createElement(View, { style: [styles.input, style] },
        isCompactHiddenPickerNeeded ? (React.createElement(View, { style: [styles.placeHolderContainerStyle, touchableStyle] },
            React.createElement(Text, { style: [styles.placeholderStyle, textInputStyle], numberOfLines: 1, ellipsizeMode: "tail" }, text),
            renderHiddenCompactIOSPicker())) : (React.createElement(TouchableWithoutFeedback, { onPress: togglePicker },
            React.createElement(View, { style: [styles.placeHolderContainerStyle, touchableStyle] },
                React.createElement(Text, { style: [styles.placeholderStyle, textInputStyle], numberOfLines: 1, ellipsizeMode: "tail" }, text)))),
        isNullable && (React.createElement(TouchableWithoutFeedback, { onPress: resetValue },
            React.createElement(View, { style: styles.resetButtonContainerStyle },
                React.createElement(Text, { style: [styles.resetButtonStyle] }, "\u2715"))))));
};
export default InputButton;
