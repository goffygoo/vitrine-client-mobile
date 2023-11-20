import { useSelector } from "react-redux";
import { themeSelector } from "../../../redux/settingReducer";
import colors from '../../../colors.json';
import { Switch, View } from "react-native";

export default function ToggleSwitch({ value, onValueChange }) {
    const theme = useSelector(themeSelector);
    return (
        <View style={{
            width: 60,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: colors.BG_COLOR_MODAL[theme], true: colors.PRIMARY_COLOR }}
                thumbColor={colors.TEXT_COLOR[theme]}
            />
        </View>
    )
}
