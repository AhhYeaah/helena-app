import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export type TextInputProps = {
  label: string;
  name: string;
  placeholder: string;
  readOnly: boolean | undefined;
  value: string;
};

export function TextInput({
  label,
  name,
  placeholder,
  value,
  readOnly = false,
}: TextInputProps) {
  return (
    <FormControl>
      <FormLabel className="font-bold text-xl">{label}</FormLabel>
      <Input
        value={value}
        readOnly={readOnly}
        name={name}
        placeholder={placeholder}
      />
    </FormControl>
  );
}
