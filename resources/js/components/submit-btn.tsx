import type { ReactNode } from 'react';
import { Button as ShadcnButton } from './ui/button';
import { LoadingSwap } from './ui/loading-swap';

export const SubmitBtn = ({
  isDisabled = false,
  children,
  className,
  buttonComponent = true,
}: {
  isDisabled?: boolean;
  children: ReactNode;
  className?: string;
  buttonComponent?: boolean;
}) => {
  const Button = buttonComponent ? ShadcnButton : 'button';
  return (
    <Button type="submit" disabled={isDisabled} className={className}>
      {buttonComponent ? <LoadingSwap isLoading={isDisabled}>{children}</LoadingSwap> : children}
    </Button>
  );
};
