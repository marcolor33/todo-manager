import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type FormInputSelectProps = {
  options: Array<string>;
  name: string;
  label: string;
  labelId: string;
} & SelectProps;

const FormInputSelect: FC<FormInputSelectProps> = ({
  options,
  name,
  label,
  labelId,
  ...rest
}) => {
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
          <InputLabel id={labelId}>{label}</InputLabel>
          <Select
            {...field}
            label={label}
            labelId={labelId}
            error={!!errors[name]}
            {...rest}
          >
            {options.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default FormInputSelect;
