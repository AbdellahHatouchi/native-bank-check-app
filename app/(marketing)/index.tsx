import { Stack } from 'expo-router';
import { View, Text } from 'react-native';

import Footer from '~/components/marketing/footer';
import Heroes from '~/components/marketing/heroes';

const MarketingPage = () => {
  return (
    <View style={{ flex: 1, padding: 8 }}>
      <Stack.Screen
        options={{
          title: 'Welcome',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
      <Heroes />
      {/* <Footer /> */}
    </View>
  );
};

export default MarketingPage;
