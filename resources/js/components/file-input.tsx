import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Controller, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from './ui/field';
import { Input } from './ui/input';

export const FileInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  name,
  label,
  imagePreviewClass,
  imageAlt,
  isImage = true,
}: Pick<ControllerProps<TFieldValues, TName, TTransformedValues>, 'name' | 'control'> & {
  label: string;
  imagePreviewClass?: string;
  imageAlt?: string;
  isImage?: boolean;
}) => {
  const [imagePreview, setImagePreview] = useState<string>();
  if (isImage && !imageAlt) throw new Error('imageAlt attribute is required.');
  return (
    <div className="space-y-2">
      {isImage && imagePreview && (
        <div
          className={cn('overflow-hidden rounded-full', imagePreviewClass, {
            'h-16 w-16': !imagePreviewClass,
          })}
        >
          <img src={imagePreview} alt={imageAlt} className="h-full w-full object-cover" />
        </div>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { name, onBlur, onChange, ref, disabled }, fieldState }) => {
          return (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel htmlFor={name}>{label}</FieldLabel>
              <Input
                type="file"
                name={name}
                onBlur={onBlur}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  onChange(file);
                  if (isImage) {
                    if (!file?.type.startsWith('image/')) {
                      setImagePreview(undefined);
                      return;
                    }
                    const fileReader = new FileReader();
                    fileReader.onload = (e) => {
                      setImagePreview(e.target?.result?.toString());
                    };
                    fileReader.readAsDataURL(file);
                  }
                }}
                ref={ref}
                disabled={disabled}
                id={name}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />
    </div>
  );
};
