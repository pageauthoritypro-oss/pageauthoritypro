import PremiumCardBorder from '@/components/PremiumCardBorder';

interface Metric {
	value: string;
	label?: string;
}

export default function MetricCard({ metric }: { metric: Metric }) {
	return (
		<div className='relative group h-24 rounded-[14px] p-5 flex flex-col gap-2 items-center justify-center text-center bg-[rgba(9,17,29,0.2)] transition-all duration-300 hover:bg-[#0f1f38]/35 hover:shadow-[0_8px_20px_rgba(199,147,61,0.08)]'>
			<PremiumCardBorder />
			<span className='font-heading font-bold text-[30px] leading-9 text-[#C7933D]'>{metric.value}</span>
			{metric.label && (
				<span className='font-heading font-normal text-[12px] leading-4 text-[#E4E4E4]'>{metric.label}</span>
			)}
		</div>
	);
}
