import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  emoji?: string;
  description: JSX.Element;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: '🛰️ Horizon/SMD Platform',
    emoji: '🛰️',
    description: (
      <>
        The world's leading open-source satellite connectivity platform. 
        20x20x2mm module enabling Argos and LoRa communication with 26% cost reduction 
        through standardisation.
      </>
    ),
    link: '/docs/platform/horizon-core/architecture',
  },
  {
    title: '🔧 Development Kits',
    emoji: '🔧',
    description: (
      <>
        Complete hardware development kits with Zephyr RTOS integration.
        Get started quickly with our proven reference designs and comprehensive
        documentation.
      </>
    ),
    link: '/docs/hardware/catalog/dev-kits',
  },
  {
    title: '🌊 Conservation Applications',
    emoji: '🌊',
    description: (
      <>
        Proven solutions for wildlife tracking, marine monitoring, and environmental
        research. From sea turtles to pangolins, deployed globally with government validation.
      </>
    ),
    link: '/docs/projects/conservation/operation-pangolin',
  },
  {
    title: '⚡ Government Validated',
    emoji: '⚡',
    description: (
      <>
        UK and EU government validation through DEFRA, CEFAS, and ESA partnerships.
        €372K ESA contract and proven regulatory compliance.
      </>
    ),
    link: '/docs/projects/maritime/marlin',
  },
  {
    title: '📖 Open Source',
    emoji: '📖',
    description: (
      <>
        Complete open-source ecosystem with commercial differentiation.
        Community-driven development with professional support options.
      </>
    ),
    link: '/community',
  },
  {
    title: '🌍 Global Deployment',
    emoji: '🌍',
    description: (
      <>
        Field-tested in harsh environments worldwide. From Arctic research
        to tropical conservation, built for extreme conditions.
      </>
    ),
    link: '/docs/projects/case-studies/deployment-reports',
  },
];

function Feature({title, emoji, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureSvg}>
          {emoji && <span className={styles.featureEmoji}>{emoji}</span>}
        </div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <a href={link} className="button button--primary button--sm">
          Learn More
        </a>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}