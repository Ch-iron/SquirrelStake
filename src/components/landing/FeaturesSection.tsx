import { Layers, Search, MousePointerClick, Gift } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const FEATURES = [
  {
    icon: Layers,
    title: 'Multi-Chain Portfolio',
    description: 'View your staking positions and balances across all supported chains at a glance.',
  },
  {
    icon: Search,
    title: 'Validator Explorer',
    description: 'Browse, compare, and choose the best validators with detailed performance metrics.',
  },
  {
    icon: MousePointerClick,
    title: 'One-Click Staking',
    description: 'Delegate, undelegate, and redelegate with a seamless single-click experience.',
  },
  {
    icon: Gift,
    title: 'Reward Tracking',
    description: 'Monitor your staking rewards in real-time and claim them whenever you want.',
  },
] as const;

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="mb-4 text-center text-3xl font-bold sm:text-4xl">
        Everything you need to stake
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
        A unified dashboard that brings multi-chain staking management into one place.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <Card
            key={feature.title}
            className="shadow-sm dark:shadow-none transition-transform duration-200 hover:scale-[1.02]"
          >
            <CardHeader>
              <feature.icon className="mb-2 size-8 text-primary" />
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
