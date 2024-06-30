import { FormControl, TextFieldProps, TextField } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type FormInputProps = {
  name: string;
  label: string;
} & TextFieldProps;

const FormInput: FC<FormInputProps> = ({ name, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field }) => (
        <FormControl fullWidth>
          <TextField
            {...field}
            {...otherProps}
            error={!!errors[name]}
            helperText={
              errors[name] ? (errors[name]?.message as unknown as string) : ''
            }
          ></TextField>
        </FormControl>
      )}
    />
  );
};

export default FormInput;
