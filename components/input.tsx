import { TextInput } from "react-native";
import React from "react";

import { cn } from "@/lib/cn";

interface FormFieldProps extends React.ComponentProps<typeof TextInput> {}

const Input = ({
  className,
  ...props
}: FormFieldProps) => {

  return (
    <TextInput
      className={cn(
        "h-16 w-full flex-1 rounded-2xl border-2 border-black-200 bg-black-100 px-4 font-semibold text-white focus:border-secondary",
        className,
      )}
      placeholderTextColor="#7b7b8b"
      {...props}
    />
  );
};

export default Input;