import MetricCard from '@/components/MetricCard';

interface Metric {
	_key?: string;
	value: string;
	label?: string;
}

interface Props {
	metrics?: Metric[];
}

export default function ResultsBlock({ metrics }: Props) {
	if (!metrics || metrics.length === 0) return null;
	return (
		<ul role='list' className='mb-7.5 grid list-none grid-cols-2 md:grid-cols-4 gap-4'>
			{metrics.map((metric, i) => (
				<li key={metric._key ?? i}>
					<MetricCard metric={metric} />
				</li>
			))}
		</ul>
	);
}
