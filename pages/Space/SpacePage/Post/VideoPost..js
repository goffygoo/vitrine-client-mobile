import { Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import { accessTokenSelector } from '../../../../redux/authReducer';
import WebView from 'react-native-webview';
import colors from '../../../../colors.json';
import config from '../../../../config.json'

const { WEBVIEW_HOST } = config;

export default function VideoPost({ post }) {
  const accessToken = useSelector(accessTokenSelector)

  const {
    _id,
    file: {
      url,
      title
    },
  } = post;

  return (
    <View style={{
      flex:1,
      height: 200,
      width: 200,
      backgroundColor: 'red'
    }}>
      {/* <WebView
        source={{ uri: `${WEBVIEW_HOST}/webview?postId=${encodeURIComponent(_id)}&accessToken=${encodeURIComponent(accessToken)}&width=200px` }}
        // injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);`}
        scalesPageToFit={true}
        allowsFullscreenVideo={true}
        style={{
          width: 200,
          height: 200,
          backgroundColor: colors.INPUT_BG_COLOR.LIGHT
        }}
      /> */}
    </View>
  )
  
  
}
