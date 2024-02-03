import React, { SetStateAction, useState } from 'react';
import { Button, H5, Sheet, XStack, YStack } from 'tamagui';

const FilterChecksSheet = ({
  open,
  setOpen,
  checkStatus,
  setCheckStatus,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  checkStatus: string;
  setCheckStatus: React.Dispatch<SetStateAction<string>>;
}) => {
  const [activeButton, setActiveButton] = useState<string>(checkStatus);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };
  const handleFilterStatus = () => {
    setCheckStatus(activeButton);
    setOpen(false);
  };
  return (
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
      <Sheet.Frame padding="$4" justifyContent="center" alignItems="center" space="$4">
        <H5>Filter Check By Status</H5>
        <YStack width="100%" space>
          <XStack space>
            <Button
              animation="lazy"
              flex={1}
              onPress={() => handleButtonClick('all')}
              theme={activeButton === 'all' ? 'blue_active' : 'dark'}>
              All
            </Button>
            <Button
              animation="lazy"
              flex={1}
              onPress={() => handleButtonClick('open')}
              theme={activeButton === 'open' ? 'blue_active' : 'dark'}>
              Open
            </Button>
          </XStack>
          <XStack space>
            <Button
              animation="lazy"
              flex={1}
              onPress={() => handleButtonClick('paid')}
              theme={activeButton === 'paid' ? 'blue_active' : 'dark'}>
              Paid
            </Button>
            <Button
              animation="lazy"
              flex={1}
              onPress={() => handleButtonClick('transfered')}
              theme={activeButton === 'transfered' ? 'blue_active' : 'dark'}>
              Transfered
            </Button>
          </XStack>
        </YStack>
        <Button
          width="100%"
          disabled={checkStatus === activeButton}
          opacity={checkStatus === activeButton ? 0.6 : 1}
          themeInverse
          onPress={handleFilterStatus}>
          Filter
        </Button>
      </Sheet.Frame>
    </Sheet>
  )
}

export default FilterChecksSheet