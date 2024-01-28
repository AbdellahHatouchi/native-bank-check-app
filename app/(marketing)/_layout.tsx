import { Slot, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const MarketingLayout = () => {
  return (
    <Stack>
      <View>
        <View>
          <Slot />
        </View>
      </View>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    height: '100%',
  },
});

export default MarketingLayout;
