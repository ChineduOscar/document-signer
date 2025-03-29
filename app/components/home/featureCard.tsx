import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
}

const FeatureCard = ({ title, description, icon, color }: FeatureCardProps) => {
  return (
    <div
      className={`rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl border-l-4 ${color}`}
    >
      <div className='flex items-center mb-4'>
        <div
          className={`p-3 rounded-full ${color
            .replace('border-', 'bg-')
            .replace('-500', '-100')} ${color.replace('border-', 'text-')}`}
        >
          {icon}
        </div>
        <h3 className='text-xl font-semibold ml-4'>{title}</h3>
      </div>
      <p className='text-gray-600'>{description}</p>
    </div>
  );
};

export default FeatureCard;
