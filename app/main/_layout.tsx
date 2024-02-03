import { Stack, useGlobalSearchParams } from 'expo-router';

const MainLayout = () => {
  const { checkNumber } = useGlobalSearchParams<{ checkNumber: string }>();
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
      <Stack.Screen
        name="[checkNumber]/index"
        options={{
          headerTitle: `CHECK ${checkNumber}`,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  );
};

export default MainLayout;
