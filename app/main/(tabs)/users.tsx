import { router } from 'expo-router';
import { ChevronRight, Codesandbox, PackageOpen, Settings2, Users } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  Paragraph,
  ScrollView,
  View,
  XStack,
  H2,
  Separator,
  Theme,
  Input,
  useTheme,
  YStack,
  SizableText,
  Text,
} from 'tamagui';

import { Loading } from '~/components/Loading';
import { getAllContact } from '~/features/contact/contactSlice';
import { AppDispatch, RootState } from '~/lib/store';
import { getInitials } from '~/lib/utils';

export default function TabTwoScreen() {
  const theme = useColorScheme();
  const themeColors = useTheme();
  const [name, setName] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, contacts, totalContact } = useSelector((state: RootState) => state.contact);
  const { totalChecks } = useSelector((state: RootState) => state.bankCheck);
  useEffect(() => {
    if (!name || name.length > 1) {
      dispatch(getAllContact({ name }));
    }
  }, [name]);
  return (
    <Theme name={theme}>
      {/* <ScrollView> */}
      <View style={{ height: '100%' }} padding="$2" flexDirection="column" display="flex" space>
        <XStack>
          <Card theme="blue" flex={1} borderWidth="$1" margin="$1.5">
            <Card.Header>
              <YStack alignItems="center" space="$8">
                {/* <View backgroundColor="$backgroundFocus" padding="$2" borderRadius="$3">
                  <Codesandbox size="24" color={theme === 'dark' ? '#FFF' : '#000'} />
                </View> */}
                <YStack alignItems="center">
                  <Paragraph>Total Users</Paragraph>
                  <H2>{totalContact}</H2>
                </YStack>
              </YStack>
            </Card.Header>
          </Card>
          <Card flex={1} borderWidth="$1" margin="$1.5">
            <Card.Header>
              <YStack alignItems="center" space="$8">
                {/* <View backgroundColor="$backgroundFocus" padding="$2" borderRadius="$3">
                  <Codesandbox size="24" color={theme === 'dark' ? '#FFF' : '#000'} />
                </View> */}
                <YStack alignItems="center">
                  <Paragraph>Total Checks</Paragraph>
                  <H2>{totalChecks}</H2>
                </YStack>
              </YStack>
            </Card.Header>
          </Card>
        </XStack>
        {/* <Separator marginVertical={15} /> */}
        <XStack space>
          <Input
            value={name}
            onChangeText={setName}
            cursorColor={themeColors.color.get()}
            placeholder="Search by name"
            flex={1}
          />
          <Button themeInverse icon={<Settings2 size={20} />} />
        </XStack>
        {isLoading && <Loading />}
        {!isLoading &&
          (contacts.length > 0 ? (
            <ScrollView>
              <YStack>
                {contacts.map((contact) => (
                  <XStack
                    key={contact.id}
                    justifyContent="space-between"
                    paddingVertical="$3"
                    borderBottomWidth="$1"
                    alignItems="center"
                    borderColor="$backgroundFocus">
                    <XStack space alignItems="center" flex={1}>
                      <XStack
                        backgroundColor="$backgroundFocus"
                        width="$5"
                        height="$5"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="$9">
                        <SizableText textTransform="uppercase" fontWeight="800">
                          {getInitials(contact.name)}
                        </SizableText>
                      </XStack>
                      <YStack>
                        <SizableText size="$5" textTransform="uppercase" fontWeight="800">
                          {contact.name}
                        </SizableText>
                        <Paragraph theme="alt2">Tel : {contact.phoneNumber}</Paragraph>
                      </YStack>
                    </XStack>
                    <ChevronRight size={25} color={theme === 'dark' ? '#FFF' : '#000'} />
                  </XStack>
                ))}
              </YStack>
            </ScrollView>
          ) : (
            <View
              flex={1}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              backgroundColor="$backgroundFocus"
              borderRadius="$5"
              padding="$5"
              space>
              <PackageOpen color={theme === 'dark' ? '#FFF' : '#000'} size={60} />
              <Text color="$color" fontSize="$6">
                No Contact available.
              </Text>
              <Button themeInverse onPress={() => router.push('/main/createContact')}>
                Add a new contact
              </Button>
            </View>
          ))}
      </View>
      {/* </ScrollView> */}
    </Theme>
  );
}
