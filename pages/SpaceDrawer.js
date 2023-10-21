import { createDrawerNavigator } from '@react-navigation/drawer';
import Space from './Space';

const Drawer = createDrawerNavigator();

export default function SpaceDrawer({ route, navigation }) {
    const spaces = ['Space 1', 'Space 2', 'Space 3', 'Space 4'];

    return (
        <Drawer.Navigator>
            {spaces.map(space =>
                <Drawer.Screen name={space} component={Space} />
            )}
        </Drawer.Navigator>
    )
}