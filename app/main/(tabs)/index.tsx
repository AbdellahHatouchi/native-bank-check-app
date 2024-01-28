import { router } from 'expo-router';
import { CarFront, CreditCard, Eye, EyeOff } from 'lucide-react-native';
import { useColorScheme } from 'react-native';
import {
  Button,
  Card,
  H2,
  Input,
  Paragraph,
  ScrollView,
  Separator,
  SizableText,
  Tabs,
  Text,
  Theme,
  View,
  XGroup,
  XStack,
  YStack,
} from 'tamagui';

const HomePage = () => {
  const theme = useColorScheme();
  return (
    <Theme name={theme}>
      <ScrollView>
        <View padding="$2" flexDirection="column" display="flex" space>
          <XGroup backgroundColor="$backgroundFocus" padding="$1.5">
            <XGroup.Item>
              <Button flex={1} themeInverse>
                Personal Checks
              </Button>
            </XGroup.Item>
            <XGroup.Item>
              <Button flex={1}>Customer Checks</Button>
            </XGroup.Item>
          </XGroup>
          <Card borderWidth="$1" margin="$1.5">
            <Card.Header>
              <XStack justifyContent="space-between">
                <Paragraph>Total Revenue</Paragraph>
                <View backgroundColor="$backgroundFocus" padding="$2" borderRadius="$3">
                  <EyeOff size="24" color={theme === 'dark' ? '#FFF' : '#000'} />
                </View>
              </XStack>
              <H2>45600 DHS</H2>
            </Card.Header>
            <XStack padding="$4" paddingTop="$0" justifyContent="space-between" gap="$2.5">
              <Button flexGrow={1} themeInverse onPress={() => router.push('/main/createCheck')}>
                Add Check
              </Button>
              <Button flexGrow={1}>Report</Button>
            </XStack>
          </Card>
          <View>
            <Input cursorColor="#010101" placeholder="Search by name" />
          </View>
          <Card borderWidth="$1">
            <Card.Header>
              <XStack justifyContent="space-between" alignItems="flex-start">
                <XStack space alignItems="center">
                  <View backgroundColor="$backgroundFocus" padding="$2" borderRadius="$3">
                    <CreditCard size="24" color={theme === 'dark' ? '#FFF' : '#000'} />
                  </View>
                  <YStack>
                    <SizableText size="$5" textTransform="uppercase" fontWeight="800">
                      Abdellah Hatouchi
                    </SizableText>
                    <Paragraph theme="alt2">04795658475509</Paragraph>
                  </YStack>
                </XStack>
                <Button size="$2" themeInverse>
                  Open
                </Button>
              </XStack>
              <Separator marginVertical={15} />
              <XStack alignItems="center">
                <YStack flex={1}>
                  <Paragraph theme="alt2">Amount</Paragraph>
                  <SizableText fontWeight="800" size="$5">
                    30000 MAD
                  </SizableText>
                </YStack>
                <Separator alignSelf="stretch" vertical marginHorizontal={15} />
                <YStack flex={1}>
                  <Paragraph theme="alt2">Payment Date</Paragraph>
                  <SizableText fontWeight="800" size="$5">
                    12 / 02 / 2024
                  </SizableText>
                </YStack>
              </XStack>
            </Card.Header>
          </Card>
          <Card borderWidth="$1">
            <Card.Header>
              <XStack justifyContent="space-between" alignItems="flex-start">
                <XStack space alignItems="center">
                  <View backgroundColor="$backgroundFocus" padding="$2" borderRadius="$3">
                    <CreditCard size="24" color={theme === 'dark' ? '#FFF' : '#000'} />
                  </View>
                  <YStack>
                    <SizableText size="$5" textTransform="uppercase" fontWeight="800">
                      Abdellah Hatouchi
                    </SizableText>
                    <Paragraph theme="alt2">04795658475509</Paragraph>
                  </YStack>
                </XStack>
                <Button size="$2" themeInverse>
                  Open
                </Button>
              </XStack>
              <Separator marginVertical={15} />
              <XStack alignItems="center">
                <YStack flex={1}>
                  <Paragraph theme="alt2">Amount</Paragraph>
                  <SizableText fontWeight="800" size="$5">
                    30000 MAD
                  </SizableText>
                </YStack>
                <Separator alignSelf="stretch" vertical marginHorizontal={15} />
                <YStack flex={1}>
                  <Paragraph theme="alt2">Payment Date</Paragraph>
                  <SizableText fontWeight="800" size="$5">
                    12 / 02 / 2024
                  </SizableText>
                </YStack>
              </XStack>
            </Card.Header>
          </Card>
          <Card borderWidth="$1">
            <Card.Header>
              <XStack justifyContent="space-between" alignItems="flex-start">
                <XStack space alignItems="center">
                  <View backgroundColor="$backgroundFocus" padding="$2" borderRadius="$3">
                    <CreditCard size="24" color={theme === 'dark' ? '#FFF' : '#000'} />
                  </View>
                  <YStack>
                    <SizableText size="$5" textTransform="uppercase" fontWeight="800">
                      Abdellah Hatouchi
                    </SizableText>
                    <Paragraph theme="alt2">04795658475509</Paragraph>
                  </YStack>
                </XStack>
                <Button size="$2" themeInverse>
                  Open
                </Button>
              </XStack>
              <Separator marginVertical={15} />
              <XStack alignItems="center">
                <YStack flex={1}>
                  <Paragraph theme="alt2">Amount</Paragraph>
                  <SizableText fontWeight="800" size="$5">
                    30000 MAD
                  </SizableText>
                </YStack>
                <Separator alignSelf="stretch" vertical marginHorizontal={15} />
                <YStack flex={1}>
                  <Paragraph theme="alt2">Payment Date</Paragraph>
                  <SizableText fontWeight="800" size="$5">
                    12 / 02 / 2024
                  </SizableText>
                </YStack>
              </XStack>
            </Card.Header>
          </Card>
          <Card borderWidth="$1">
            <Card.Header>
              <XStack justifyContent="space-between" alignItems="flex-start">
                <XStack space alignItems="center">
                  <View backgroundColor="$backgroundFocus" padding="$2" borderRadius="$3">
                    <CreditCard size="24" color={theme === 'dark' ? '#FFF' : '#000'} />
                  </View>
                  <YStack>
                    <SizableText size="$5" textTransform="uppercase" fontWeight="800">
                      Abdellah Hatouchi
                    </SizableText>
                    <Paragraph theme="alt2">04795658475509</Paragraph>
                  </YStack>
                </XStack>
                <Button size="$2" themeInverse>
                  Open
                </Button>
              </XStack>
              <Separator marginVertical={15} />
              <XStack alignItems="center">
                <YStack flex={1}>
                  <Paragraph theme="alt2">Amount</Paragraph>
                  <SizableText fontWeight="800" size="$5">
                    30000 MAD
                  </SizableText>
                </YStack>
                <Separator alignSelf="stretch" vertical marginHorizontal={15} />
                <YStack flex={1}>
                  <Paragraph theme="alt2">Payment Date</Paragraph>
                  <SizableText fontWeight="800" size="$5">
                    12 / 02 / 2024
                  </SizableText>
                </YStack>
              </XStack>
            </Card.Header>
          </Card>
          <Card borderWidth="$1">
            <Card.Header>
              <XStack justifyContent="space-between" alignItems="flex-start">
                <XStack space alignItems="center">
                  <View backgroundColor="$backgroundFocus" padding="$2" borderRadius="$3">
                    <CreditCard size="24" color={theme === 'dark' ? '#FFF' : '#000'} />
                  </View>
                  <YStack>
                    <SizableText size="$5" textTransform="uppercase" fontWeight="800">
                      Abdellah Hatouchi
                    </SizableText>
                    <Paragraph theme="alt2">04795658475509</Paragraph>
                  </YStack>
                </XStack>
                <Button size="$2" themeInverse>
                  Open
                </Button>
              </XStack>
              <Separator marginVertical={15} />
              <XStack alignItems="center">
                <YStack flex={1}>
                  <Paragraph theme="alt2">Amount</Paragraph>
                  <SizableText fontWeight="800" size="$5">
                    30000 MAD
                  </SizableText>
                </YStack>
                <Separator alignSelf="stretch" vertical marginHorizontal={15} />
                <YStack flex={1}>
                  <Paragraph theme="alt2">Payment Date</Paragraph>
                  <SizableText fontWeight="800" size="$5">
                    12 / 02 / 2024
                  </SizableText>
                </YStack>
              </XStack>
            </Card.Header>
          </Card>
          <Card borderWidth="$1">
            <Card.Header>
              <XStack justifyContent="space-between" alignItems="flex-start">
                <XStack space alignItems="center">
                  <View backgroundColor="$backgroundFocus" padding="$2" borderRadius="$3">
                    <CreditCard size="24" color={theme === 'dark' ? '#FFF' : '#000'} />
                  </View>
                  <YStack>
                    <SizableText size="$5" textTransform="uppercase" fontWeight="800">
                      Abdellah Hatouchi
                    </SizableText>
                    <Paragraph theme="alt2">04795658475509</Paragraph>
                  </YStack>
                </XStack>
                <Button size="$2" themeInverse>
                  Open
                </Button>
              </XStack>
              <Separator marginVertical={15} />
              <XStack alignItems="center">
                <YStack flex={1}>
                  <Paragraph theme="alt2">Amount</Paragraph>
                  <SizableText fontWeight="800" size="$5">
                    30000 MAD
                  </SizableText>
                </YStack>
                <Separator alignSelf="stretch" vertical marginHorizontal={15} />
                <YStack flex={1}>
                  <Paragraph theme="alt2">Payment Date</Paragraph>
                  <SizableText fontWeight="800" size="$5">
                    12 / 02 / 2024
                  </SizableText>
                </YStack>
              </XStack>
            </Card.Header>
          </Card>
          <Card borderWidth="$1">
            <Card.Header>
              <XStack justifyContent="space-between" alignItems="flex-start">
                <XStack space alignItems="center">
                  <View backgroundColor="$backgroundFocus" padding="$2" borderRadius="$3">
                    <CreditCard size="24" color={theme === 'dark' ? '#FFF' : '#000'} />
                  </View>
                  <YStack>
                    <SizableText size="$5" textTransform="uppercase" fontWeight="800">
                      Abdellah Hatouchi
                    </SizableText>
                    <Paragraph theme="alt2">04795658475509</Paragraph>
                  </YStack>
                </XStack>
                <Button size="$2" themeInverse>
                  Open
                </Button>
              </XStack>
              <Separator marginVertical={15} />
              <XStack alignItems="center">
                <YStack flex={1}>
                  <Paragraph theme="alt2">Amount</Paragraph>
                  <SizableText fontWeight="800" size="$5">
                    30000 MAD
                  </SizableText>
                </YStack>
                <Separator alignSelf="stretch" vertical marginHorizontal={15} />
                <YStack flex={1}>
                  <Paragraph theme="alt2">Payment Date</Paragraph>
                  <SizableText fontWeight="800" size="$5">
                    12 / 02 / 2024
                  </SizableText>
                </YStack>
              </XStack>
            </Card.Header>
          </Card>
        </View>
      </ScrollView>
    </Theme>
  );
};

export default HomePage;
