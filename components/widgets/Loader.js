import { ActivityIndicator } from "react-native";
import colors from '../../colors.json';

export default function Loader() {
  return (
    <ActivityIndicator
      size={"large"}
      color={colors.PRIMARY_COLOR}
    />
  )
}
