import { TextareaAutosize, TextareaAutosizeProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { useTheme } from "../../hooks/useTheme";

type FormInputProps<T extends FieldValues> = TextareaAutosizeProps & {
  name: Path<T>;
  control: Control<T>;
  label: string;
  minRows?: number;
  required?: boolean;
};

export const TextareaInput = <T extends FieldValues>({
  name,
  control,
  label,
  minRows = 1,
  required = false,
  ...rest // Spread all other props
}: FormInputProps<T>) => {
  const { theme } = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextareaAutosize
          required={required}
          {...rest} // Spread all other props to TextareaAutosize
          minRows={minRows} // Default minimum rows for the textarea (adjustable)
          onChange={onChange}
          value={value ?? ""}
          placeholder={label}
          className={`${theme == "light" ? "bg-transparent border border-gray-300" : "bg-transparent border border-gray-500"} p-4 w-full rounded-md`}
        />
      )}
    />
  );
};
