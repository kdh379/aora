import { View, Image } from "react-native";
import React, { useState } from "react";

import { icons } from "@/constants";
import Input from "@/components/input";
import CustomButton from "@/components/custom-button";

interface SecureInputProps extends React.ComponentProps<typeof Input> {}

const SecureInput = ({ secureTextEntry, ...props }: SecureInputProps) => {
  const [showSecurityText, setShowSecurityText] = useState(false);

  return (
    <View className="relative">
      <Input
        secureTextEntry={secureTextEntry && !showSecurityText}
        {...props}
      />

      {secureTextEntry && (
        <CustomButton
          variant="ghost"
          size="icon"
          onPress={() => setShowSecurityText(!showSecurityText)}
          className="absolute inset-y-0 right-0 justify-center pr-4"
        >
          <Image
            className="size-6"
            resizeMode="contain"
            source={showSecurityText ? icons.eye : icons.eyeHide}
          />
        </CustomButton>
      )}
    </View>
  );
};

export default SecureInput;