var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
const AndroidDatePicker = (_a) => {
    var { show, disabled, renderInput, containerStyle } = _a, pickerProps = __rest(_a, ["show", "disabled", "renderInput", "containerStyle"]);
    return (React.createElement(React.Fragment, null,
        React.createElement(View, { style: containerStyle }, renderInput()),
        show && !disabled ? React.createElement(DateTimePicker, Object.assign({}, pickerProps)) : null));
};
export default AndroidDatePicker;
