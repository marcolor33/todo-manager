import { FC } from "react";
import { Controller, useFormContext } from 'react-hook-form';
import { DateTimePicker, LocalizationProvider, DateTimePickerProps } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { FormControl, FormHelperText } from '@mui/material';

type FormInputDatetimeProps = {
    name: string;
    label: string;
} & DateTimePickerProps<Date>

const FormInputDatetime: FC<FormInputDatetimeProps> = ({
    name,
    label,
    ...rest
}) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            control={control}
            defaultValue={null}
            name={name}
            render={({ field }) => (
                <FormControl fullWidth error={!!errors[name]}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            {...field}
                            label={label}
                            {...rest}
                        />
                    </LocalizationProvider>
                    {errors[name] && (
                        <FormHelperText>{errors[name]?.message as string}</FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
};

export default FormInputDatetime;