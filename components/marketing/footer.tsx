import { View, StyleSheet } from 'react-native';
import { Button } from 'tamagui';

const Footer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button>Privacy Policy</Button>
        <Button>Terms & Conditions</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 'auto',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
  },
});

export default Footer;
