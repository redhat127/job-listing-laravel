import { cn } from '@/lib/utils';
import { Controller, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from './ui/field';
import { Textarea } from './ui/textarea';

export const Textbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  name,
  label,
  className,
}: Pick<ControllerProps<TFieldValues, TName, TTransformedValues>, 'name' | 'control'> & {
  label: string;
  className?: string;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid} className="gap-2">
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Textarea {...field} id={field.name} aria-invalid={fieldState.invalid} autoComplete="on" className={cn(className)} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};
