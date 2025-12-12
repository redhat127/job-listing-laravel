import type { ComponentProps } from 'react';
import { Controller, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from './ui/field';
import { Input } from './ui/input';

export const TextInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  name,
  label,
  inputType = 'text',
}: Pick<ControllerProps<TFieldValues, TName, TTransformedValues>, 'name' | 'control'> & {
  label: string;
  inputType?: ComponentProps<'input'>['type'];
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid} className="gap-2">
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Input type={inputType} {...field} id={field.name} aria-invalid={fieldState.invalid} autoComplete="on" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};
