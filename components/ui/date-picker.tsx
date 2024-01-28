import { CalendarIcon } from 'lucide-react-native';
import { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';
import { Button, View, Sheet, useTheme, H6 } from 'tamagui';

interface DatePickerProps {
  value: string;
  setDate: (value: string) => void;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({ value, setDate }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  return (
    <View>
      <Button
        onPress={() => setOpen(true)}
        borderWidth="$1"
        borderColor="$backgroundFocus"
        icon={<CalendarIcon style={{ marginRight: 'auto', opacity: 0.8, height: 16, width: 16 }} />}
        style={[{ textAlign: 'left', fontFamily: 'normal' }, !value && { color: 'gray' }]}>
        {value ? value : 'Pick payment date'}
      </Button>
      <Sheet
        forceRemoveScrollEnabled={open}
        modal
        open={open}
        onOpenChange={setOpen}
        snapPointsMode="fit"
        dismissOnSnapToBottom
        zIndex={100_000}
        animation="bouncy">
        <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Sheet.Handle />
        <Sheet.Frame padding="$4" justifyContent="center" alignItems="center" space="$5">
          {/* contant */}
          <H6 color="$color" textTransform="uppercase">
            Bank Check Payemnt Date
          </H6>
          <DatePicker
            selected={value}
            onSelectedChange={setDate}
            mode="calendar"
            options={{
              backgroundColor: theme.backgroundFocus.get(),
              textHeaderColor: theme.color.get(),
              textDefaultColor: theme.color.get(),
              selectedTextColor: theme.backgroundPress.get(),
              mainColor: theme.color.get(),
              textSecondaryColor: theme.colorFocus.get(),
              borderColor: 'rgba(122, 146, 165, 0.2)',
            }}
            style={{ borderRadius: 10 }}
          />
          <Button onPress={() => setOpen(false)} themeInverse width="100%">
            Set Date
          </Button>
        </Sheet.Frame>
      </Sheet>
    </View>
  );
};

export default CustomDatePicker;
