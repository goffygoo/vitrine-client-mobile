import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview';
import { useSelector } from 'react-redux';
import { accessTokenSelector, refreshTokenSelector, userIdSelector } from '../../../../redux/authReducer';
import colors from '../../../../colors.json';
import config from '../../../../config.json'
import { themeSelector } from '../../../../redux/settingReducer';
import { useMemo } from 'react';
import { getDateStamp, getTimeStamp } from '../../../../util/helper';
const { WEBVIEW_HOST } = config;

export default function Editor({ post, showModal }) {
  const theme = useSelector(themeSelector);
  const styles = useMemo(() => generateStyles(theme), [theme]);
  const accessToken = useSelector(accessTokenSelector);
  const refreshToken = useSelector(refreshTokenSelector);
  const userId = useSelector(userIdSelector);
  const linkImage = theme === 'DARK' ? require('../../../../assets/LinkLight.png') : require('../../../../assets/LinkDark.png')
  const {
    _id,
    updatedAt
  } = post;
  const dateObj = new Date(updatedAt);
  const uri = `${WEBVIEW_HOST}/webview?postId=${encodeURIComponent(_id)}&accessToken=${encodeURIComponent(accessToken)}&refreshToken=${encodeURIComponent(refreshToken)}&userId=${encodeURIComponent(userId)}`;
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri }}
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);`}
        scalesPageToFit={true}
        style={{
          flex: 1,
          backgroundColor: colors.INPUT_BG_COLOR.LIGHT
        }}
      />
      <View style={styles.footer}>
        <Pressable
          onPress={() => showModal({ uri, title: 'Editor' })}
          style={styles.fullScreen}
        >
          <Image
            style={styles.linkImg}
            source={linkImage}
            resizeMode='cover'
          />
          <Text style={styles.footerText}>Full Screen</Text>
        </Pressable>
        <Text style={styles.timestamp}>
          {`${getDateStamp(dateObj)} • ${getTimeStamp(dateObj)}`}
        </Text>
      </View>
    </View>
  )
}

const generateStyles = THEME => StyleSheet.create({
  container: {
    height: 240,
    width: '70%',
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: colors.BG_COLOR_MODAL[THEME],
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  fullScreen: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
  },
  linkImg: {
    height: 24,
    width: 24,
  },
  footerText: {
    fontWeight: '500',
    paddingLeft: 8,
    fontSize: 12,
    color: colors.TEXT_COLOR[THEME],
  },
  timestamp: {
    paddingRight: 8,
    fontSize: 12,
    color: colors.TEXT_COLOR_ALT[THEME],
  },
})