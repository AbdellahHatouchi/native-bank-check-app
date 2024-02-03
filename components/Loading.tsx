import { Spinner, Text, YStack } from 'tamagui';

export function Loading({ message }: { message?: string }) {
  message ??= 'Loading';

  return (
    <YStack padding="$5" justifyContent="center">
      <Spinner size="large" color="$color" borderRadius="$3" />
      <Text textAlign="center" color="$color" marginTop="$6">
        {message} …
      </Text>
    </YStack>
  );
}
