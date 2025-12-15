import { Controller, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';
import { Field, FieldError } from './ui/field';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

export const RadioGroupInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  name,
  label,
  items,
}: Pick<ControllerProps<TFieldValues, TName, TTransformedValues>, 'name' | 'control'> & {
  label: string;
  items: ReadonlyArray<{ label: string; value: string }>;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-2">
          <div className="text-sm font-[500]">{label}</div>
          <RadioGroup {...field} onValueChange={field.onChange}>
            {items.map(({ value, label }) => {
              const id = `radio-group-input-${name}-${value}`;
              return (
                <div className="flex items-center gap-3" key={value}>
                  <RadioGroupItem value={value} id={id} />
                  <Label htmlFor={id}>{label}</Label>
                </div>
              );
            })}
          </RadioGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
