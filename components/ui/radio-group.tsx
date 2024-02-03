import React, { createContext, useContext, useState } from 'react';
import { Animated } from 'react-native';
import { Button, XGroup } from 'tamagui';

// Define the type for radio option
type RadioOption = {
  label: string;
  value: string | number;
};

// Create a context to manage radio button state
const RadioContext = createContext<{
  selectedValue: string | number;
  setSelectedValue: (value: string | number | any) => void;
}>({
  selectedValue: '',
  setSelectedValue: () => {},
});

// Custom radio button component
const RadioButton: React.FC<RadioOption> = ({ label, value }) => {
  const { selectedValue, setSelectedValue } = useContext(RadioContext);
  const scale = useState(new Animated.Value(1))[0];
  const handlePress = () => {
    setSelectedValue(value);
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.05, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }], flex: 1, gap: 6 }}>
      <Button flex={1} themeInverse={selectedValue === value} onPress={handlePress}>
        {label}
      </Button>
    </Animated.View>
  );
};

// Radio group component
const RadioGroup: React.FC<{
  options: RadioOption[];
  defaultValue?: string | number;
  selectedValue: string | number;
  setSelectedValue: (value: string | number | any) => void;
}> = ({ options, defaultValue = '', selectedValue, setSelectedValue }) => {
  //   const [selectedValue, setSelectedValue] = useState<string | number>(defaultValue);
  return (
    <RadioContext.Provider value={{ selectedValue, setSelectedValue }}>
      <XGroup backgroundColor="$backgroundFocus" padding="$1.5">
        {options.map((option) => (
          <XGroup.Item key={option.value}>
            <RadioButton {...option} />
          </XGroup.Item>
        ))}
      </XGroup>
    </RadioContext.Provider>
  );
};

export default RadioGroup;
