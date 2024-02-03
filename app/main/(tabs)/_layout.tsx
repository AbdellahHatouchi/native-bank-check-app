import { Link, Tabs } from 'expo-router';
import { Bell, Wallet2, X } from 'lucide-react-native';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';

export default function TabLayout() {
  const theme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2994F2',
        tabBarInactiveTintColor: '#92B3D3',
        tabBarStyle: {
          height: 65,
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          fontWeight: '500',
          fontSize: 12,
          marginBottom: 10,
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Checks',
          headerTitle: 'Personal Checks',
          tabBarIcon: ({ color }) => <Wallet2 color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Bell
                    size={25}
                    color={theme === 'dark' ? '#FFF' : '#000'}
                    style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <X color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <X color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
});
