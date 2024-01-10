import { Text, View } from 'react-native'

export default function FilePost({ post }) {
  const {
    _id,
    file: {
      url,
      title
    },
  } = post;
  return (
    <View>
      <Text>FilePost</Text>
    </View>
  )
}
