import { features } from '@/app/data';
import FeatureCard from './featureCard';
const FeaturesSection = () => {
  return (
    <section className='py-16 px-6 md:px-20 bg-gray-50'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4'>
          Powerful PDF Annotation Tools
        </h2>
        <p className='text-center text-gray-600 mb-12 max-w-3xl mx-auto'>
          PDFAnnotate provides you with all the tools you need to comment,
          highlight, add text, and sign PDF documents with ease.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
