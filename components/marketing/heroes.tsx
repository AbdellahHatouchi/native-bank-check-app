import { router } from 'expo-router';
import { View, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text } from 'tamagui';

import { decrement, increment } from '~/features/counter';
import { RootState } from '~/lib/store';

const Heroes = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Button theme="blue" onPress={() => router.push('/main/')}>
            Get Started
          </Button>
          <Button onPress={() => dispatch(increment())}>Increment</Button>
          <Text color="$color">{count}</Text>
          <Button onPress={() => dispatch(decrement())}>Decrement</Button>
          {/* <Image source={require('/assets/icon.png')} style={styles.image} contentFit="fill" />
          <Image
            source={require('/assets/icon.png')}
            style={styles.imageDark}
            contentFit="fill"
          /> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: 300,
    height: 300,
    // You can adjust the width and height based on your requirements
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
  },
  imageDark: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
  },
});

export default Heroes;
