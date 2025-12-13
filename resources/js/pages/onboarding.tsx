import { CreateCompanyForm } from '@/components/form/create-company-form';
import { BaseLayout } from '@/components/layout/base';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, Briefcase, Building2 } from 'lucide-react';
import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';

type Role = 'company' | 'jobSeeker' | null;
type Step = 'role-selection' | 'show-company-form' | 'show-job-seeking-form';

type OnboardingContextType = {
  step: Step;
  setStep: Dispatch<SetStateAction<Step>>;
  selectedRole: Role;
  setSelectedRole: Dispatch<SetStateAction<Role>>;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};

const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState<Step>('role-selection');
  const [selectedRole, setSelectedRole] = useState<Role>(null);

  return <OnboardingContext.Provider value={{ step, setStep, selectedRole, setSelectedRole }}>{children}</OnboardingContext.Provider>;
};

export default function Onboarding() {
  return (
    <OnboardingProvider>
      <div className="mx-auto mt-8 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>
              <h1 className="font-bold">Welcome</h1>
            </CardTitle>
            <OnboardingDescription />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <RoleSelection />
              <CreateCompany />
            </div>
            <BackButton />
          </CardContent>
        </Card>
      </div>
    </OnboardingProvider>
  );
}

const CreateCompany = () => {
  const { step } = useOnboarding();

  if (step !== 'show-company-form') return null;

  return <CreateCompanyForm />;
};

const OnboardingDescription = () => {
  const { step } = useOnboarding();

  const descriptions: Record<Step, string> = {
    'role-selection': "Tell us what you're looking to do",
    'show-company-form': "Let's set up your company",
    'show-job-seeking-form': 'Tell us about your job preferences',
  };

  return <CardDescription>{descriptions[step]}</CardDescription>;
};

const BackButton = () => {
  const { step, setStep } = useOnboarding();

  if (step === 'role-selection') return null;

  return (
    <Button className="mt-2 w-full cursor-pointer" onClick={() => setStep('role-selection')} variant="outline">
      <ArrowRight />
      Back
    </Button>
  );
};

const RoleSelection = () => {
  const { step, selectedRole, setStep } = useOnboarding();

  if (step !== 'role-selection') return null;

  const handleContinue = () => {
    setStep(selectedRole === 'company' ? 'show-company-form' : 'show-job-seeking-form');
  };

  return (
    <>
      <RoleSelectionCard
        role="company"
        title="Create a company"
        description="I want to post jobs and build my team. I'm hiring."
        icon={<Building2 className="shrink-0 text-blue-600" />}
      />
      <RoleSelectionCard
        role="jobSeeker"
        title="Find a Job"
        description="I'm looking for my next opportunity. I'm job searching."
        icon={<Briefcase className="shrink-0 text-green-600" />}
      />
      <Button className="w-full" disabled={!selectedRole} onClick={handleContinue}>
        Continue
      </Button>
    </>
  );
};

const RoleSelectionCard = ({ title, description, icon, role }: { title: string; description: string; icon: ReactNode; role: Role }) => {
  const { selectedRole, setSelectedRole } = useOnboarding();

  return (
    <div
      className={cn('cursor-pointer space-y-2 rounded-md border p-4 transition-colors', {
        'hover:border-sky-600': role !== selectedRole,
        'border-green-600 bg-green-50': role === selectedRole,
      })}
      onClick={() => setSelectedRole(role)}
    >
      <h2 className="flex items-start gap-1.5 font-bold">
        {icon}
        <span>{title}</span>
      </h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

Onboarding.layout = (page: ReactNode) => <BaseLayout head={{ title: 'Choose Your Path' }}>{page}</BaseLayout>;
