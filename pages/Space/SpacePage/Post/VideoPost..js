import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import { accessTokenSelector, refreshTokenSelector, userIdSelector } from '../../../../redux/authReducer';
import colors from '../../../../colors.json';
import config from '../../../../config.json'
import { themeSelector } from '../../../../redux/settingReducer';
import { useMemo } from 'react';
import { getDateStamp, getTimeStamp } from '../../../../util/helper';

const { WEBVIEW_HOST } = config;

export default function VideoPost({ post, showModal }) {
  const theme = useSelector(themeSelector);
  const styles = useMemo(() => generateStyles(theme), [theme]);
  const accessToken = useSelector(accessTokenSelector);
  const refreshToken = useSelector(refreshTokenSelector);
  const userId = useSelector(userIdSelector);
  const {
    _id,
    file: {
      url,
      title
    },
    createdAt
  } = post;
  const dateObj = new Date(createdAt);
  const uri = `${WEBVIEW_HOST}/webview?postId=${encodeURIComponent(_id)}&accessToken=${encodeURIComponent(accessToken)}&refreshToken=${encodeURIComponent(refreshToken)}&userId=${encodeURIComponent(userId)}`;
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>{title}</Text>
        <Pressable
          style={styles.pressable}
          onPress={() => showModal({ uri, title: 'Video' })}
        >
          <Image
            source={require('../../../../assets/Play.png')}
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
    alignItems: 'center',
    borderRadius: 4,
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