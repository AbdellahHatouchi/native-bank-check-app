import { Stack } from 'expo-router';

const MainLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="createCheck"
        options={{
          headerTitle: 'Create Check',
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

export default MainLayout;
