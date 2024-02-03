import { format, isValid, parse } from 'date-fns';
import { router } from 'expo-router';
import { CreditCard, Eye, EyeOff, PackageOpen, Settings2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, TouchableOpacity, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  H2,
  Input,
  Paragraph,
  ScrollView,
  Separator,
  SizableText,
  Text,
  Theme,
  View,
  XGroup,
  XStack,
  YStack,
  useTheme,
} from 'tamagui';

import { Loading } from '~/components/Loading';
import FilterChecksSheet from '~/components/filter-checks-sheet';
import RadioGroup from '~/components/ui/radio-group';
import { getAllBankChecks } from '~/features/bankCheck/bankCheckSlice';
import { AppDispatch, RootState } from '~/lib/store';
import { formatNumberAsMAD, getBackGound } from '~/lib/utils';

const HomePage = () => {
  const theme = useColorScheme();
  const themeColors = useTheme();
  const [showTotalAmount, setShowTotalAmount] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [checkStatus, setCheckStatus] = useState<string>('open');
  const [checkNumber, setCheckNumber] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const [checkType, setCheckType] = useState<'personal' | 'customer'>('personal');
  const { isLoading, bankChecks, totalAmount } = useSelector((state: RootState) => state.bankCheck);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!checkNumber || checkNumber.length > 1) {
      dispatch(getAllBankChecks({ checkNumber, checkType, checkStatus }));
    }
  }, [checkNumber, checkType, checkStatus]);
  const ShowIcon = showTotalAmount ? EyeOff : Eye;
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const bankChecks = await getAllChecks();
  //       setChecks(bankChecks);
  //     } catch (error) {
  //       console.error('Error fetching bank checks:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  //   console.log('Bank checks');
  // }, []);

  return (
    <Theme name={theme}>
      <ScrollView>
        <View style={{ height: '100%' }} padding="$2" flexDirection="column" display="flex" space>
          <RadioGroup
            options={[
              { label: 'Personal Checks', value: 'personal' },
              { label: 'Customer Checks', value: 'customer' },
            ]}
            defaultValue="personal"
            selectedValue={checkType}
            setSelectedValue={setCheckType}
          />
          <Card borderWidth="$1" margin="$1.5">
            <Card.Header>
              <XStack justifyContent="space-between">
                <Paragraph>Total Amount</Paragraph>
                <View
                  onPress={() => setShowTotalAmount(!showTotalAmount)}
                  backgroundColor="$backgroundFocus"
                  padding="$2"
                  borderRadius="$3">
                  <ShowIcon size="24" color={theme === 'dark' ? '#FFF' : '#000'} />
                </View>
              </XStack>
              <H2>{showTotalAmount ? formatNumberAsMAD(totalAmount) : '*******'}</H2>
            </Card.Header>
            <XStack padding="$4" paddingTop="$0" justifyContent="space-between" gap="$2.5">
              <Button flexGrow={1} themeInverse onPress={() => router.push('/main/createCheck')}>
                Add Check
              </Button>
              <Button flexGrow={1}>Report</Button>
            </XStack>
          </Card>
          <XStack space>
            <Input
              value={checkNumber}
              onChangeText={setCheckNumber}
              cursorColor={themeColors.color.get()}
              placeholder="Search by bank check Number"
              keyboardType="number-pad"
              flex={1}
            />
            <Button themeInverse icon={<Settings2 size={20} />} onPress={() => setOpen(true)} />
          </XStack>
          {isLoading && <Loading />}
          {!isLoading &&
            (bankChecks.length > 0 ? (
              bankChecks.map((check) => {
                return (
                  <Pressable
                    key={check.id}
                    onPress={() =>
                      router.push({
                        pathname: `/main/[checkNumber]/`,
                        params: { checkNumber: check.checkNumber, id: check.id },
                      })
                    }>
                    <Card borderWidth="$1" borderColor="$backgroundFocus">
                      <Card.Header>
                        <XStack justifyContent="space-between" alignItems="flex-start">
                          <XStack space alignItems="center">
                            <View backgroundColor="$backgroundFocus" padding="$2" borderRadius="$3">
                              <CreditCard size="24" color={theme === 'dark' ? '#FFF' : '#000'} />
                            </View>
                            <YStack>
                              <SizableText size="$5" textTransform="uppercase" fontWeight="800">
                                {check.userId}
                              </SizableText>
                              <Paragraph theme="alt2">Check Number : {check.checkNumber}</Paragraph>
                            </YStack>
                          </XStack>
                          <Button
                            size="$2"
                            themeInverse
                            backgroundColor={getBackGound(check.checkStatus)}>
                            {check.checkStatus === 'transfered'
                              ? 'TRANS'
                              : check.checkStatus.toUpperCase()}
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
                                ? format(
                                  parse(check.paymentDate, 'yyyy/MM/dd', new Date()),
                                  'dd / MM / yyyy'
                                )
                                : 'Invalid Date'}
                              {/* {format(new Date(check.paymentDate), 'dd / MM / yyyy')} */}
                            </SizableText>
                          </YStack>
                        </XStack>
                      </Card.Header>
                    </Card>
                  </Pressable>
                );
              })
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
                  No checks available.
                </Text>
                <Button themeInverse onPress={() => router.push('/main/createCheck')}>
                  Add a new check
                </Button>
              </View>
            ))}
        </View>
        <FilterChecksSheet
          open={open}
          setOpen={setOpen}
          checkStatus={checkStatus}
          setCheckStatus={setCheckStatus}
        />
      </ScrollView>
    </Theme>
  );
};

export default HomePage;
