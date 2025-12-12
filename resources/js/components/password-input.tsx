import { Controller, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from './ui/field';
import { PasswordInput as WDS_PasswordInput } from './ui/password-input';

export const PasswordInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  name,
  label,
}: Pick<ControllerProps<TFieldValues, TName, TTransformedValues>, 'name' | 'control'> & { label: string }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid} className="gap-2">
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <WDS_PasswordInput {...field} id={field.name} aria-invalid={fieldState.invalid} autoComplete="on" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};
