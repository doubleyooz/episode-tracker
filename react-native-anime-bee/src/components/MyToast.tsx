import { useState } from "react";
import Toast from "react-native-root-toast";

// Add a Toast on screen.

const MyToast: React.FC<{ visible: boolean; text: string }> = (props) => {
  const { visible, text } = props;

  let toast = Toast.show("Request failed to send.", {
    duration: Toast.durations.LONG,
  });

  // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
  setTimeout(function hideToast() {
    Toast.hide(toast);
  }, 500);

  return <Toast visible={visible}>{text}</Toast>;
};

export default MyToast;
