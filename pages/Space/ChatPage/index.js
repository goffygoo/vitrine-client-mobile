import { createDrawerNavigator } from '@react-navigation/drawer';
import ChatPage from './ChatPage';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../../redux/settingReducer';
import { useMemo } from 'react';
import colors from '../../../colors.json';
import PersonCard from './PersonCard';

const Drawer = createDrawerNavigator();

function CustomDrawerContent() {
  const theme = useSelector(themeSelector);
  const styles = useMemo(() => generateStyles(theme), [theme]);

  const people = {
    admins: [
      {
        name: 'Captain Baljeet',
        online: true,
      },
      {
        name: 'Politician Baljeet',
        online: false,
      },
    ],
    members: [
      {
        name: 'Baljeet Badmash',
        online: true,
      },
      {
        name: 'Crazy Alina',
        online: true,
      },
      {
        name: 'South Indian Anna Baljeet',
        online: true,
      },
      {
        name: 'Jaggu Bander',
        online: false,
      },
      {
        name: 'Sleepy Baljeet',
        online: false,
      },
    ]
  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.scrollInner}>
        <Text style={styles.heading}>Admin</Text>
        {
          people.admins.sort((a, b) => b.online - a.online).map(person => {
            return <PersonCard
              name={person.name}
              online={person.online}
              isAdmin
            />
          })
        }
        <Text style={styles.heading}>Members</Text>
        {
          people.members.sort((a, b) => b.online - a.online).map(person => {
            return <PersonCard
              name={person.name}
              online={person.online}
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