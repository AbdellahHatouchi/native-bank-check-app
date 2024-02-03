import React, { SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, H5, Sheet } from 'tamagui';

import { UpdateBankCheckStatus } from '~/features/bankCheck/bankCheckSlice';
import { AppDispatch } from '~/lib/store';

const UpadateStatusSheet = ({
  open,
  setOpen,
  defaultValue,
  id,
}: {
  id: string;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  defaultValue: string;
}) => {
  const [activeButton, setActiveButton] = useState<string>(defaultValue);
  const dispatch = useDispatch<AppDispatch>();

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };
  const handleUpdateStatus = () => {
    dispatch(UpdateBankCheckStatus({ id, status: activeButton }));
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
        <H5>Update Check Status</H5>
        <Button
          animation="lazy"
          width="100%"
          onPress={() => handleButtonClick('open')}
          theme={activeButton === 'open' ? 'blue_active' : 'dark'}>
          Open
        </Button>
        <Button
          animation="lazy"
          width="100%"
          onPress={() => handleButtonClick('paid')}
          theme={activeButton === 'paid' ? 'blue_active' : 'dark'}>
          Paid
        </Button>
        <Button
          animation="lazy"
          width="100%"
          onPress={() => handleButtonClick('transfered')}
          theme={activeButton === 'transfered' ? 'blue_active' : 'dark'}>
          Transfered
        </Button>
        <Button
          width="100%"
          disabled={defaultValue === activeButton}
          opacity={defaultValue === activeButton ? 0.6 : 1}
          themeInverse
          onPress={handleUpdateStatus}>
          Update
        </Button>
      </Sheet.Frame>
    </Sheet>
  );
};

export default UpadateStatusSheet;
