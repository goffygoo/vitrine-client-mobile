import { View, StyleSheet, Text, Pressable, Image } from 'react-native'
import colors from '../../../colors.json';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../../redux/settingReducer';
import { useMemo } from 'react';
import { getDateStamp, getTimeStamp } from '../../../util/helper';

export default function UpcomingTile(event) {
  const theme = useSelector(themeSelector);
  const styles = useMemo(() => generateStyles(theme), [theme]);

  const {
    title,
    description,
    spaceId,
    startTime,
  } = event;

  const dateObject = new Date(startTime);

  const handlePress = async () => {}

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        android_ripple={{ color: colors.AND_RIPPLE[theme], foreground: true }}
        onPress={handlePress}
      >
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../../../assets/EventCover.png')} />
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionHeading}>
            {title}
          </Text>
          <Text style={styles.descriptionSubheading}>
            {description}
          </Text>
          <Text style={styles.descriptionTime}>
            {`${getDateStamp(dateObject)} • ${getTimeStamp(dateObject)}`}
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

const generateStyles = THEME => StyleSheet.create({
  container: {
    height: 144,
    width: 160,
    backgroundColor: colors.BG_COLOR_MODAL[THEME],
    borderRadius: 4,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: colors.TEXT_COLOR[THEME],
  },
  pressable: {
    flex: 1,
  },
  imageContainer: {
    height: 68,
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  description: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginHorizontal: 8,
  },
  descriptionHeading: {
    color: colors.TEXT_COLOR_LIGHT[THEME],
    fontSize: 12,
    fontWeight: '600',
  },
  descriptionSubheading: {
    color: colors.TEXT_COLOR_LIGHT[THEME],
    fontSize: 12,
    fontWeight: '300',
  },
  descriptionTime: {
    color: colors.TEXT_COLOR_LIGHT[THEME],
    fontSize: 12,
    fontWeight: '600',
  },
})
