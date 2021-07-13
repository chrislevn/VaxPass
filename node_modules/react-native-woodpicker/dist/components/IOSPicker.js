import React from "react";
import { View, Modal, Animated, TouchableOpacity, } from "react-native";
import { Picker as RNPicker } from "@react-native-picker/picker";
import { styles } from "../helpers/stylesHelper";
const IOSPicker = ({ selectedItem, disabled, show, title, renderInput, renderDoneBar, renderPickerItems, onItemChange, togglePicker, containerStyle, animationValue, customProps, }) => {
    return (React.createElement(View, { style: containerStyle },
        renderInput(),
        React.createElement(Modal, { visible: show && !disabled, transparent: true, animationType: "slide", supportedOrientations: ["portrait", "landscape"] },
            React.createElement(TouchableOpacity, { style: styles.blurTouchable, onPress: togglePicker },
                React.createElement(Animated.View, { style: [
                        styles.animatedInput,
                        {
                            opacity: animationValue,
                        },
                    ] })),
            renderDoneBar(),
            React.createElement(RNPicker, Object.assign({ style: styles.iosPickerContainer, prompt: title, 
                // @ts-ignore
                onValueChange: onItemChange, selectedValue: selectedItem.value }, customProps), renderPickerItems()))));
};
export default IOSPicker;
