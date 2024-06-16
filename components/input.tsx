import { View, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { cn } from "@/lib/cn";
import { icons } from "@/constants";

interface FormFieldProps extends React.ComponentProps<typeof TextInput> {}

const Input = ({
  className,
  secureTextEntry,
  ...props
}: FormFieldProps) => {
  const [showSecurityText, setShowSecurityText] = useState(false);

  return (
    <View className="relative">
      <TextInput
        className={cn(
          "h-16 w-full flex-1 rounded-2xl border-2 border-black-200 bg-black-100 px-4 font-semibold text-white focus:border-secondary",
          className,
        )}
        placeholderTextColor="#7b7b8b"
        secureTextEntry={secureTextEntry && !showSecurityText}
        {...props}
      />

      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => setShowSecurityText(!showSecurityText)}
          className="absolute inset-y-0 right-0 justify-center pr-4"
        >
          <Image
            className="size-6"
            resizeMode="contain"
            source={showSecurityText ? icons.eye : icons.eyeHide}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;