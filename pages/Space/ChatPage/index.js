import { createDrawerNavigator } from '@react-navigation/drawer';
import ChatPage from './ChatPage';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../../redux/settingReducer';
import { useMemo } from 'react';
import colors from '../../../colors.json';
import PersonCard from './PersonCard';
import { activeSpaceSelector } from '../../../redux/spacesReducer';
import { membersSelector, onlineMembersSelector } from '../../../redux/chatReducer';

const Drawer = createDrawerNavigator();

function CustomDrawerContent() {
  const theme = useSelector(themeSelector);
  const styles = useMemo(() => generateStyles(theme), [theme]);

  const spaceId = useSelector(activeSpaceSelector);
  const members = useSelector(membersSelector(spaceId));

  const onlineMembers = useSelector(onlineMembersSelector);
  const provider = Object.keys(members || {}).filter(id => members[id].provider);
  const consumers = Object.keys(members || {}).filter(id => !members[id].provider);

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.scrollInner}>
        <Text style={styles.heading}>Admin</Text>
        {
          provider.map(person => {
            return <PersonCard
              name={members[person].name}
              profilePicture={members[person].profilePicture}
              online={onlineMembers[person]}
              isAdmin
            />
          })
        }
        <Text style={styles.heading}>Members</Text>
        {
          consumers.map(person => {
            return <PersonCard
              name={members[person].name}
              profilePicture={members[person].profilePicture}
              online={onlineMembers[person]}
            />
          })
        }
      </View>
    </ScrollView>
  );
}

const generateStyles = THEME => StyleSheet.create({
  scroll: {
    backgroundColor: colors.BG_COLOR_SECONDARY[THEME],
    width: '100%',
  },
  scrollInner: {
    width: '100%',
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 8,
    color: colors.INPUT_PLACEHOLDER[THEME],
  }
})

export default function SpaceDrawer({ route, navigation }) {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent} screenOptions={{
      drawerPosition: 'right',
      headerShown: false,
      drawerStyle: {
        width: 240,
      }
    }}>
      <Drawer.Screen name={"Chat"} component={ChatPage} />
    </Drawer.Navigator>
  )
}