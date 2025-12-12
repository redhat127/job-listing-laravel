import type { ReactNode } from 'react';
import { Button } from './ui/button';
import { LoadingSwap } from './ui/loading-swap';

export const SubmitBtn = ({ isDisabled = false, children }: { isDisabled?: boolean; children: ReactNode }) => {
  return (
    <Button type="submit" disabled={isDisabled}>
      <LoadingSwap isLoading={isDisabled}>{children}</LoadingSwap>
    </Button>
  );
};
