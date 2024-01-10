import { Text, View } from 'react-native'

export default function Poll({ post }) {
  const {
    _id,
    poll: {
      question,
      options,
      type
    }
  } = post;
  return (
    <View>
      <Text>Poll</Text>
    </View>
  )
}
