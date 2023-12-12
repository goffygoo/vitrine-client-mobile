import { View } from "react-native";

export default function Divider({ size, orientation = "h" }) {
    const gap = {
        "s": 4,
        "m": 8,
        "l": 16,
        "xl": 32,
    }[size] ?? 2;

    const horizontal = {
        height: gap,
        width: '100%',
    }

    const vertical = {
        height: '100%',
        width: gap,
    }

    const style = {
        ["v"]: vertical
    }[orientation] ?? horizontal

    return (
        <View style={style}></View>
    )
}