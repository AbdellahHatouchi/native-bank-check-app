import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Easing, Image, useColorScheme, View as ReactNativeView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, H2, Text, Theme, View, YStack } from 'tamagui';

import { getAllContact } from '~/features/contact/contactSlice';
import { decrement, increment } from '~/features/counter';
import { AppDispatch, RootState } from '~/lib/store';
import { createBankCheckTable } from '~/model/bank-check';
import { createContactTable } from '~/model/contact';

const logoDark = require('../../assets/wallet-dark.png');
const logoLight = require('../../assets/wallet-light.png');
const Heroes = () => {
  const theme = useColorScheme();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.contact);
  const [scaleAnim] = useState(new Animated.Value(1));
  const uriLight = Image.resolveAssetSource(logoLight).uri;
  const uriDark = Image.resolveAssetSource(logoDark).uri;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2, // Final scale value: 1.2
          duration: 1000, // Duration of each animation cycle (in milliseconds)
          easing: Easing.ease, // Easing function for smooth animation
          useNativeDriver: false, // Animated API doesn't support native driver for scale animation
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Initial scale value: 1
          duration: 1000, // Duration of each animation cycle (in milliseconds)
          easing: Easing.ease, // Easing function for smooth animation
          useNativeDriver: false, // Animated API doesn't support native driver for scale animation
        }),
      ])
    ).start();
  }, []);
  useEffect(() => {
    dispatch(getAllContact({ name: '' }));
  }, []);
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        return router.replace('/main/');
      }, 3500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isLoading]);

  const getStarted = () => {
    try {
      createContactTable();
      createBankCheckTable();
      router.push('/main/');
    } catch {
      console.log('Failed to get started');
    }
  };
  return (
    // <View>
    //   <View>
    //     <View>
    //       <Button theme="blue" onPress={getStarted}>
    //         Get Started
    //       </Button>
    //       <Button onPress={() => dispatch(increment())}>Increment</Button>
    //       <Text color="$color">{count}</Text>
    //       <Button onPress={() => dispatch(decrement())}>Decrement</Button>
    //       {/* <Image source={require('/assets/icon.png')} style={styles.image} contentFit="fill" />
    //       <Image
    //         source={require('/assets/icon.png')}
    //         style={styles.imageDark}
    //         contentFit="fill"
    //       /> */}
    //     </View>
    //   </View>
    // </View>
    <Theme name={theme}>
      <View height="100%" width="100%">
        <YStack height="100%">
          <YStack flex={1} justifyContent="center" alignItems="center" space>
            <Image
              source={{ uri: theme === 'dark' ? uriDark : uriLight }}
              style={{
                position: 'relative',
                resizeMode: 'contain',
              }}
              width={120}
              height={100}
              alt="logo"
            />
            <Animated.View
              style={{
                position: 'absolute',
                width: 140,
                height: 140,
                zIndex: -999,
                top: '50%',
                left: '50%',
                transform: [{ translateX: -70 }, { translateY: -105 }, { scale: scaleAnim }],
                backgroundColor: '#E63C3A',
                borderRadius: 999,
              }}
            />
            <H2 fontWeight="800">Cardy Pay</H2>
          </YStack>
          <View height="$0.75" backgroundColor="#E63C3A" borderRadius={99} />
        </YStack>
      </View>
    </Theme>
  );
};

export default Heroes;
