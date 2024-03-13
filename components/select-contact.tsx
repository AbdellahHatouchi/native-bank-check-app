import { Check, ChevronDown, ChevronUp, Contact2, PackageOpen } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import type { FontSizeTokens, SelectProps } from 'tamagui';
import { Text, Input, Adapt, Select, Sheet, YStack, getFontSize, View, Button } from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient';

interface CustomSelectProps extends SelectProps {
  id: string;
  label: string;
  items: { id?: string; name: string; phone: string }[];
  val: string;
  setVal: (value: string) => void;
}

const SelectContact: React.FC<CustomSelectProps> = ({ id, label, items, val, setVal }, props) => {
  // const [val, setVal] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const theme = useColorScheme();

  // Filter items based on search term
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Select
      id={id}
      value={val}
      open={open}
      onOpenChange={setOpen}
      onValueChange={setVal}
      disablePreventBodyScroll
      {...props}>
      <Select.Trigger asChild>
        {/* <Select.Value textTransform="uppercase" placeholder={placeholder} /> */}
        <Button
          themeInverse
          icon={<Contact2 color="#000" size={25} />}
          onPress={() => setOpen(true)}>
          Import Contact
        </Button>
      </Select.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>

          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>
      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3">
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>

          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$background', 'transparent']}
            borderRadius="$4"
          />
        </Select.ScrollUpButton>
        <Select.Viewport
          // to do animations:
          animation="quick"
          animateOnly={['transform', 'opacity']}
          enterStyle={{ o: 0, y: -10 }}
          exitStyle={{ o: 0, y: 10 }}
          minWidth={200}>
          <Select.Group space="$1.5" padding="$2.5">
            <Select.Label fontSize="$5" textAlign="center">
              {label}
            </Select.Label>
            {/* Search input */}
            <Input
              placeholder="Search..."
              cursorColor="#010101"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            {/* for longer lists memoizing these is useful */}

            {useMemo(
              () =>
                filteredItems.length > 0 ? (
                  filteredItems.map((item, i) => {
                    return (
                      <Select.Item
                        index={i}
                        key={item.name}
                        backgroundColor="$backgroundFocus"
                        borderRadius="$5"
                        borderWidth="$1"
                        borderColor="$backgroundHover"
                        value={item.id ?? item.name}>
                        <Select.ItemText padding="$2" textTransform="uppercase" asChild>
                          <YStack>
                            <Text fontSize="$4" color="$color" fontWeight="600">
                              {item.name}
                            </Text>
                            <Text fontSize="$3" color="$gray10">
                              {item.phone}
                            </Text>
                          </YStack>
                        </Select.ItemText>

                        <Select.ItemIndicator marginLeft="auto">
                          <Check size={20} color={theme === 'dark' ? '#FFF' : '#000'} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    );
                  })
                ) : (
                  <View alignItems="center" justifyContent="center" padding="20" height="$19">
                    {/* Display icon when filtered items list is empty */}
                    <PackageOpen size={160} color="#CCC" />
                    <Text color="$color" fontSize="$6" fontWeight="$4">
                      No {label} found
                    </Text>
                  </View>
                ),

              [filteredItems]
            )}
          </Select.Group>

          {/* Native gets an extra icon */}

          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width="$4"
              pointerEvents="none">
              <ChevronDown size={getFontSize((props.size as FontSizeTokens) ?? '$true')} />
            </YStack>
          )}
        </Select.Viewport>
        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3">
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>

          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['transparent', '$background']}
            borderRadius="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
};

export default SelectContact;
