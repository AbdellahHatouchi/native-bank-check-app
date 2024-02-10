import { format, isValid, parse } from 'date-fns';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeftRight,
  CalendarCheck2,
  CreditCard,
  Landmark,
  NotebookPen,
  SwatchBook,
} from 'lucide-react-native';
import { useState } from 'react';
import { useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Separator,
  Paragraph,
  SizableText,
  View,
  XStack,
  YStack,
  Card,
  ScrollView,
  Theme,
} from 'tamagui';

import { DeleteAlert } from '~/components/delete-alert';
import UpadateStatusSheet from '~/components/update-status-sheet';
import { DeleteBankCheck } from '~/features/bankCheck/bankCheckSlice';
import { AppDispatch, RootState } from '~/lib/store';
import { formatNumberAsMAD, getBackGound } from '~/lib/utils';

const CheckIdPage = () => {
  const theme = useColorScheme();
  const { id }: { id: string } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const bankChecks = useSelector((state: RootState) => state.bankCheck.bankChecks);
  const check = bankChecks.find((check) => check.id === id);
  const [open, setOpen] = useState<boolean>(false);
  const handleDelete = () => {
    try {
      dispatch(DeleteBankCheck({ id }));
      return router.back();
    } catch {
      console.log('Failed to delete');
    }
  };

  if (!check) {
    return router.replace('/main/');
  }

  return (
    <Theme name={theme}>
      <UpadateStatusSheet
        id={check.id ?? ''}
        defaultValue={check.checkStatus}
        open={open}
        setOpen={setOpen}
      />
      <View
        paddingHorizontal="$2"
        paddingVertical="$3"
        style={{ height: '100%' }}
        display="flex"
        flexDirection="column"
        space>
        <Card borderWidth="$1" borderColor="$backgroundFocus">
          <Card.Header>
            <XStack justifyContent="space-between" alignItems="flex-start">
              <XStack space alignItems="center">
                <View backgroundColor="$backgroundFocus" padding="$2" borderRadius="$3">
                  <CreditCard size="24" color={theme === 'dark' ? '#FFF' : '#000'} />
                </View>
                <YStack>
                  <SizableText size="$5" textTransform="uppercase" fontWeight="800">
                    {check.contactName}
                  </SizableText>
                  <Paragraph theme="alt2">Check Number : {check.checkNumber}</Paragraph>
                </YStack>
              </XStack>
              <Button size="$2" themeInverse backgroundColor={getBackGound(check.checkStatus)}>
                {check.checkStatus === 'transfered' ? 'TRANS' : check.checkStatus.toUpperCase()}
              </Button>
            </XStack>
            <Separator marginVertical={15} />
            <XStack alignItems="center">
              <YStack flex={1}>
                <Paragraph theme="alt2">Amount</Paragraph>
                <SizableText fontWeight="800" size="$5">
                  {formatNumberAsMAD(check.amount)}
                </SizableText>
              </YStack>
              <Separator alignSelf="stretch" vertical marginHorizontal={15} />
              <YStack flex={1}>
                <Paragraph theme="alt2">Payment Date</Paragraph>
                <SizableText fontWeight="800" size="$5">
                  {isValid(parse(check.paymentDate, 'yyyy/MM/dd', new Date()))
                    ? format(parse(check.paymentDate, 'yyyy/MM/dd', new Date()), 'dd / MM / yyyy')
                    : 'Invalid Date'}
                  {/* {format(new Date(check.paymentDate), 'dd / MM / yyyy')} */}
                </SizableText>
              </YStack>
            </XStack>
          </Card.Header>
        </Card>
        <ScrollView space flex={1}>
          <Card borderWidth="$1" borderColor="$backgroundFocus">
            <Card.Header>
              <XStack alignItems="center">
                <YStack flex={1}>
                  <Paragraph theme="alt2">Check Type</Paragraph>
                  <SizableText fontWeight="800" size="$5" textTransform="uppercase">
                    {check.checkType}
                  </SizableText>
                </YStack>
                <Separator alignSelf="stretch" vertical marginHorizontal={15} />
                <YStack flex={1}>
                  <Paragraph theme="alt2">Created Date</Paragraph>
                  <SizableText fontWeight="800" size="$5">
                    {/* {isValid(parse(check.timestamp, 'yyyy/MM/dd', new Date()))
                  ? format(parse(check.timestamp, 'yyyy/MM/dd', new Date()), 'dd / MM / yyyy')
                  : 'Invalid Date'} */}
                    {format(new Date(check.timestamp || ''), 'dd / MM / yyyy')}
                  </SizableText>
                </YStack>
              </XStack>
              <Separator marginVertical={15} />
              <XStack space alignItems="center">
                <View backgroundColor="$backgroundFocus" padding="$2" borderRadius="$3">
                  <SwatchBook size="24" color={theme === 'dark' ? '#FFF' : '#000'} />
                </View>
                <YStack>
                  <Paragraph theme="alt2">Check Status</Paragraph>
                  <SizableText fontWeight="800" size="$5">
                    {check.checkStatus.toUpperCase()}
                  </SizableText>
                </YStack>
              </XStack>
              <Separator marginVertical={15} />
              <XStack space alignItems="center">
                <View backgroundColor="$backgroundFocus" padding="$2" borderRadius="$3">
                  <Landmark size="24" color={theme === 'dark' ? '#FFF' : '#000'} />
                </View>
                <YStack>
                  <Paragraph theme="alt2">Bank Name</Paragraph>
                  <SizableText fontWeight="800" size="$5">
                    {check.bankName ?? 'Your Bank'}
                  </SizableText>
                </YStack>
              </XStack>
              <Separator marginVertical={15} />
              <XStack space alignItems="center">
                <View backgroundColor="$backgroundFocus" padding="$2" borderRadius="$3">
                  <NotebookPen size="24" color={theme === 'dark' ? '#FFF' : '#000'} />
                </View>
                <YStack>
                  <Paragraph theme="alt2">Note</Paragraph>
                  <SizableText fontWeight="800" size="$5">
                    {check.note}
                  </SizableText>
                </YStack>
              </XStack>
            </Card.Header>
          </Card>
          {/* transfer card  */}
          {check.checkStatus === 'transfered' && (
            <Card borderWidth="$1" borderColor="$backgroundFocus">
              <Card.Header>
                <XStack space alignItems="center">
                  <View backgroundColor="$backgroundFocus" padding="$2" borderRadius="$3">
                    <ArrowLeftRight size="24" color={theme === 'dark' ? '#FFF' : '#000'} />
                  </View>
                  <YStack flex={1}>
                    <Paragraph theme="alt2">Recipient</Paragraph>
                    <SizableText fontWeight="800" size="$5" textTransform="uppercase">
                      user name
                    </SizableText>
                  </YStack>
                </XStack>
                <Separator marginVertical={15} />
                <XStack space alignItems="center">
                  <View backgroundColor="$backgroundFocus" padding="$2" borderRadius="$3">
                    <CalendarCheck2 size="24" color={theme === 'dark' ? '#FFF' : '#000'} />
                  </View>
                  <YStack flex={1}>
                    <Paragraph theme="alt2">Transfer Date</Paragraph>
                    <SizableText fontWeight="800" size="$5" textTransform="uppercase">
                      02 /02 /2024
                    </SizableText>
                  </YStack>
                </XStack>
              </Card.Header>
            </Card>
          )}
        </ScrollView>
        <XStack gap="$3">
          <Button themeInverse flex={1} onPress={() => setOpen(true)}>
            Update Status
          </Button>
          <DeleteAlert
            onPressAction={handleDelete}
            label="Delete"
            title="Delete Check"
            description="Are you sure you want to delete this check? This action cannot be undone."
          />
        </XStack>
      </View>
    </Theme>
  );
};

export default CheckIdPage;
