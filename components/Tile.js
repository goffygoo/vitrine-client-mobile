import { View, StyleSheet, Text } from 'react-native'

export default function Tile() {
  return (
    <>
      <View style={styles.container}>
        <Text></Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#121212"
  }
})
