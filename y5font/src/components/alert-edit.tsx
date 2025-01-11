import { Check } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function AlertEdit() {
  return (
    <Alert variant="destructive">
      <Check className="h-4 w-4" />
      <AlertTitle>Edit Success</AlertTitle>
      <AlertDescription>Your Edit has successed. let`s read article.</AlertDescription>
    </Alert>
  );
}
