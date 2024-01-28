import { router } from 'expo-router';
import { View, StyleSheet, Image } from 'react-native';
import { Button } from 'tamagui';

const Heroes = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Button theme="blue" onPress={() => router.push('/main/')}>
            Get Started
          </Button>
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
