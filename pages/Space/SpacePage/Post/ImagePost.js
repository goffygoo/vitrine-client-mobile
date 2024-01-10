import { Text, View } from 'react-native'

export default function ImagePost({ post }) {
  const {
    _id,
    file: {
      url,
      title
    },
  } = post;
  return (
    <View>
      <Text>ImagePost</Text>
    </View>
  )
}
