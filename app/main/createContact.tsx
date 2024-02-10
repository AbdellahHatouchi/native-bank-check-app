import { zodResolver } from '@hookform/resolvers/zod';
import * as Contacts from 'expo-contacts';
import { router } from 'expo-router';
import { Contact2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useColorScheme } from 'react-native';
import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';
import { Button, Form, View, Theme, Spinner, TextArea, ScrollView, Separator } from 'tamagui';
import * as z from 'zod';

import {
  Form as FormHook,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '~/components/ui/form';
import SelectItem from '~/components/ui/select';
import { addNewContact } from '~/features/contact/contactSlice';
import { AppDispatch } from '~/lib/store';
import { BankList } from '~/lib/utils';

export const formSchema = z.object({
  name: z.string().min(3),
  phoneNumber: z
    .string()
    .regex(/^(?:\+212|0)[5-9]\d{8}$/, 'Please enter a valid Moroccan phone number'),
  email: z.string().optional(),
  note: z.string().optional(),
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
const getContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.FirstName],
    });

    if (data.length > 0) {
      const contact = data[0];
      console.log(contact);
    }
  } else {
    console.log('Contacts.requestPermissions', status);
  }
};

const CreateContact = () => {
  const theme = useColorScheme();
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');
  // const { createBankCheck } = useBankCheck();
  const dispatch = useDispatch<AppDispatch>();
  // // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
    },
  });

  // // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setStatus('submitting');
    try {
      const id = uuid.v4() as string;
      dispatch(addNewContact({ id, ...values })).unwrap();
      // create(values);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
   getContacts();
  }, []);
  useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => {
        setStatus('off');
        form.reset();
        router.back();
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);
  return (
    <Theme name={theme}>
      <ScrollView height="100%">
        <View padding="$2">
          <Button themeInverse icon={<Contact2 color="#000" size={25} />}>
            Import Contact
          </Button>
          <Separator marginVertical={15} />
          <FormHook {...form}>
            <Form onSubmit={form.handleSubmit(onSubmit)}>
              <Form.Trigger asChild>
                <View height="100%" space>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl
                          placeholder="contact name"
                          onBlur={onBlur}
                          value={value}
                          onChangeText={onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl
                          keyboardType="number-pad"
                          placeholder="+212********"
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
                    name="email"
                    render={({ field: { onChange, value, onBlur } }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl
                          placeholder="email is optional"
                          onBlur={onBlur}
                          value={value}
                          onChangeText={onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  <View paddingVertical="$3">
                    <Button
                      themeInverse
                      onPress={form.handleSubmit(onSubmit)}
                      icon={status === 'submitting' ? () => <Spinner color="$color" /> : undefined}>
                      Create Contact
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

export default CreateContact;
