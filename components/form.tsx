import { createContext, useContext } from "react";
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from "react-hook-form";
import { Text, View } from "react-native";

import { cn } from "@/lib/cn";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    ...props
  }: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  return {
    name: fieldContext.name,
    ...fieldState,
  };
};

interface FormItemProps extends React.ComponentProps<typeof View> {
  label: string;
  required?: boolean;
}

const FormItem = ({ label, required, className, children, ...props }: FormItemProps) => {
  const { error } = useFormField();

  return (
    <View className={cn("space-y-2", className)} {...props}>
      <View className={cn("flex-row items-center")}>
        <Text
          className={cn(
            "font-medium text-gray-100",
            error && "text-red-500",
            className,
          )}
          {...props}
        >
          {label}
        </Text>
        {required && <Text className="ml-1 text-red-500">*</Text>}
        {error && <FormErrorMessage />}
      </View>
      {children}
    </View>
  );
};

const FormErrorMessage = () => {
  const { error } = useFormField();
  const text = error?.message || "입력값이 올바르지 않습니다.";

  return (
    <Text
      className={"ml-auto font-medium text-red-500"}
    >
      {text}
    </Text>
  );
};

export { Form, FormField, FormItem };