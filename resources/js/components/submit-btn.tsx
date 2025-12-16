import type { ComponentProps, ReactNode } from 'react';
import { Button as ShadcnButton } from './ui/button';
import { LoadingSwap } from './ui/loading-swap';

export const SubmitBtn = ({
  isDisabled = false,
  children,
  className,
  buttonComponent = true,
  form,
  variant,
}: {
  isDisabled?: boolean;
  children: ReactNode;
  className?: string;
  buttonComponent?: boolean;
  form?: string;
  variant?: ComponentProps<typeof ShadcnButton>['variant'];
}) => {
  const Button = buttonComponent ? ShadcnButton : 'button';
  return (
    <Button type="submit" disabled={isDisabled} className={className} form={form} variant={variant}>
      {buttonComponent ? <LoadingSwap isLoading={isDisabled}>{children}</LoadingSwap> : children}
    </Button>
  );
};
