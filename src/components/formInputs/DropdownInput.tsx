import { TextField, MenuItem, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type FormInputDropdownProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  options: { label: string; value: string | number }[]; // Dropdown options

  varient?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
  required?: boolean;
};
export const FormInputDropdown = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  variant = "filled",
  size = "medium",
  required = false,
  ...rest
}: FormInputDropdownProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...rest}
          select
          helperText={error ? error.message : null}
          size={size}
          error={!!error}
          onChange={onChange}
          value={value || ""}
          fullWidth
          label={
            label ? (
              <>
                {label} {required && <span> *</span>}
              </>
            ) : undefined
          }
          variant={variant}
          sx={{
            ...rest.sx,
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};
