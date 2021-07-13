import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { styles } from "../helpers/stylesHelper";
const DoneBar = ({ title, doneButtonLabel, onDonePress, }) => {
    return (React.createElement(View, { style: styles.doneBar },
        React.createElement(View, { style: styles.doneColumnStyle },
            React.createElement(Text, { style: styles.placeholderStyle }, title)),
        React.createElement(TouchableWithoutFeedback, { onPress: onDonePress },
            React.createElement(View, { style: styles.doneColumnStyle },
                React.createElement(Text, { style: styles.doneButtonLabelStyle }, doneButtonLabel || "Done")))));
};
export default DoneBar;
