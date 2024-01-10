import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { getFileUrl } from '../../../util/helper'
import { useSelector } from 'react-redux'
import { themeSelector } from '../../../redux/settingReducer'
import { useMemo } from 'react';
import colors from '../../../colors.json';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function ImageHeader({ displayPicture, coverPicture, title, description }) {
  const theme = useSelector(themeSelector);
  const styles = useMemo(() => generateStyles(theme), [theme]);
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: getFileUrl(coverPicture)
        }}
        style={styles.bannerImg}
        resizeMode='cover'
      />
      <View style={styles.infoBox}>
        <Image
          source={{
            uri: getFileUrl(displayPicture)
          }}
          style={styles.img}
          resizeMode='cover'
        />
        <View style={styles.headingBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </View>
  )
}

const generateStyles = THEME => StyleSheet.create({
  container: {
    marginTop: 8,
    width: '90%',
  },
  bannerImg: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.9 / 4,
    borderRadius: 8
  },
  infoBox: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'flex-end',
    marginTop: -32,
    marginBottom: 32,
  },
  img: {
    height: 96,
    width: 96,
    borderRadius: 48,
    borderWidth: 20,
  },
  headingBox: {
    paddingLeft: 16,
    paddingBottom: 8,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    color: colors.TEXT_COLOR_LIGHT[THEME],
  },
  description: {
    fontWeight: '300',
    fontSize: 14,
    color: colors.TEXT_COLOR_LIGHT[THEME],
  },
})
