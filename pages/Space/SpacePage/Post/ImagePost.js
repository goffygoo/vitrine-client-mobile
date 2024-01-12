import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import colors from '../../../../colors.json';
import { themeSelector } from '../../../../redux/settingReducer';
import { useMemo } from 'react';
import { getDateStamp, getFileUrl, getTimeStamp } from '../../../../util/helper';

export default function ImagePost({ post, showModal }) {
  const theme = useSelector(themeSelector);
  const styles = useMemo(() => generateStyles(theme), [theme]);
  const {
    _id,
    file: {
      url,
      title
    },
    createdAt
  } = post;
  const dateObj = new Date(createdAt);
  const uri = getFileUrl(url);
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>{title}</Text>
        <Pressable
          style={styles.pressable}
          onPress={() => showModal({ uri, title: 'Image' })}
        >
          <Image
            source={{ uri }}
            style={styles.img}
            resizeMode='center'
          />
        </Pressable>
      </View>
      <View style={styles.footer}>
        <Text style={styles.timestamp}>
          {`${getDateStamp(dateObj)} • ${getTimeStamp(dateObj)}`}
        </Text>
      </View>
    </View>
  )
}

const generateStyles = THEME => StyleSheet.create({
  container: {
    width: '70%',
    borderRadius: 8,
    marginVertical: 16,
    overflow: 'hidden',
    backgroundColor: colors.BG_COLOR_MODAL[THEME],
  },
  main: {
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: '500',
    color: colors.TEXT_COLOR[THEME],
  },
  pressable: {
    height: 96,
    width: 200,
    borderRadius: 4,
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {
    height: 96,
    width: 96,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 8,
  },
  timestamp: {
    fontSize: 12,
    color: colors.TEXT_COLOR_ALT[THEME],
  },
})