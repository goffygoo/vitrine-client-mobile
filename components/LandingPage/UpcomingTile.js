import { View, StyleSheet, Text, Pressable, Image } from 'react-native'
import colors from '../../colors.json';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../redux/settingReducer';
import { useMemo } from 'react';

export default function UpcomingTile() {
  const theme = useSelector(themeSelector);
  const styles = useMemo(() => generateStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.pressable} android_ripple={{ color: colors.AND_RIPPLE_LIGHT }}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../../assets/EventCover.png')} />
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionHeading}>
            Art Fest City of Harrisburgh
          </Text>
          <Text style={styles.descriptionSubheading}>
            Cultural Pennsylvania
          </Text>
          <Text style={styles.descriptionTime}>
            25 Oct  •  7:00 pm
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
    backgroundColor: colors.TEXT_COLOR[THEME],
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
    color: colors.BG_COLOR[THEME],
    fontSize: 12,
    fontWeight: '600',
  },
  descriptionSubheading: {
    color: colors.BG_COLOR[THEME],
    fontSize: 12,
    fontWeight: '300',
  },
  descriptionTime: {
    color: colors.BG_COLOR[THEME],
    fontSize: 12,
    fontWeight: '600',
  },
})
