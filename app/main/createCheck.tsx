import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useColorScheme } from 'react-native';
import { Button, Form, View, Theme, Spinner, XStack, TextArea, ScrollView } from 'tamagui';
import * as z from 'zod';

import CustomDatePicker from '~/components/ui/date-picker';
import {
  Form as FormHook,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '~/components/ui/form';
import RadioGroup from '~/components/ui/radio-group';
import SelectItem from '~/components/ui/select';
import { BankList, fakeUserData } from '~/lib/utils';

const formSchema = z.object({
  checkType: z.enum(['personal', 'customer']),
  checkNumber: z.string().regex(/^\d{5,12}$/, 'Must be a positive integer with 5 to 12 digits'),
  amount: z.coerce.number().positive().min(500, 'The amount must be at least 500.'),
  paymentDate: z.string(),
  userId: z.string(),
  note: z.string(),
  bankName: z
    .enum([
      'Attijariwafa Bank',
      'Banque Populaire',
      'BMCE Bank',
      'BMCI Bank',
      'Crédit Agricole du Maroc',
      'Société Générale Maroc',
      'Bank Al-Maghrib',
      'Crédit du Maroc',
      'CIH Bank',
      'Crédit Immobilier et Hôtelier',
      'Banque Centrale Populaire',
    ])
    .optional(),
});

const CreateCheck = () => {
  const theme = useColorScheme();
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');
  // // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      checkType: 'personal',
      checkNumber: '',
      amount: 0,
      paymentDate: '',
      note: '',
      userId: '',
    },
  });
  const userLabel = form.watch('checkType') === 'customer' ? 'Customer' : 'Recipient';

  // // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setStatus('submitting');
    console.log(values);
  }
  useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => setStatus('off'), 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);
  return (
    <Theme name={theme}>
      <ScrollView height="100%">
        <View padding="$2">
          <FormHook {...form}>
            <Form onSubmit={form.handleSubmit(onSubmit)}>
              <Form.Trigger asChild>
                <View height="100%" space>
                  <FormField
                    control={form.control}
                    name="checkType"
                    render={({ field: { onChange, value } }) => (
                      <FormItem>
                        <FormLabel>Select Check Type</FormLabel>
                        <RadioGroup
                          options={[
                            { label: 'Personal Checks', value: 'personal' },
                            { label: 'Customer Checks', value: 'customer' },
                          ]}
                          defaultValue="personal"
                          selectedValue={value}
                          setSelectedValue={onChange}
                        />
                        <FormDescription>
                          Please select the type of check you want to process.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="checkNumber"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <FormItem>
                        <FormLabel>Check Number</FormLabel>
                        <FormControl
                          keyboardType="number-pad"
                          placeholder="0087609"
                          onBlur={onBlur}
                          value={value}
                          onChangeText={onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <XStack space>
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <FormItem flex={1}>
                          <FormLabel>Amount</FormLabel>
                          <FormControl
                            keyboardType="number-pad"
                            placeholder="9900.9 MAD"
                            onBlur={onBlur}
                            value={String(value)}
                            onChangeText={onChange}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="paymentDate"
                      render={({ field: { onChange, value } }) => (
                        <FormItem flex={1}>
                          <FormLabel>Payment Date</FormLabel>
                          <CustomDatePicker value={value} setDate={onChange} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </XStack>
                  <FormField
                    control={form.control}
                    name="userId"
                    render={({ field: { onChange, value } }) => (
                      <FormItem>
                        <FormLabel textTransform="capitalize">{userLabel}</FormLabel>
                        <SelectItem
                          id="userName"
                          label={`${userLabel} Name`}
                          placeholder={`Select ${userLabel} Name...`}
                          items={fakeUserData}
                          val={value}
                          setVal={onChange}
                        />
                        <FormDescription>{`Please select the ${userLabel}  of the bank check.`}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.watch('checkType') === 'customer' && (
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field: { onChange, value } }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <SelectItem
                            id="bankName"
                            label="Bank Name"
                            placeholder="Select Bank Name..."
                            items={BankList}
                            val={value ?? ''}
                            setVal={onChange}
                          />
                          {/* <FormDescription>This is your public display name.</FormDescription> */}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <FormItem>
                        <FormLabel>Note</FormLabel>
                        <TextArea
                          paddingVertical="$0"
                          rows={5}
                          placeholder="note is optional"
                          cursorColor="#010101"
                          onBlur={onBlur}
                          value={value}
                          onChangeText={onChange}
                          fontSize="$5"
                          borderWidth="$1"
                        />
                        {/* <FormDescription>This is your public display name.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <View flex={1} paddingVertical="$3" justifyContent="flex-end">
                    <Button
                      themeInverse
                      onPress={form.handleSubmit(onSubmit)}
                      icon={status === 'submitting' ? () => <Spinner color="$color" /> : undefined}>
                      Create Check
                    </Button>
                  </View>
                </View>
              </Form.Trigger>
            </Form>
          </FormHook>
        </View>
      </ScrollView>
    </Theme>
  );
};

export default CreateCheck;
