import { Link } from 'expo-router';
import { YStack, H2, Separator, Theme, Button } from 'tamagui';

// import EditScreenInfo from '../../components/edit-screen-info';

export default function TabOneScreen() {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <H2>Tab One</H2>
        <Button>
          <Link href="/">Go to Home</Link>
        </Button>
        <Separator />
        {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      </YStack>
    </Theme>
  );
}
