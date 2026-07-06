import type { ComponentType, SVGProps } from 'react';

import FacebookIcon from './FacebookIcon';
import TwitterXIcon from './TwitterXIcon';
import InstagramIcon from './InstagramIcon';
import LinkedinIcon from './LinkedinIcon';
import YoutubeIcon from './YoutubeIcon';
import GithubIcon from './GithubIcon';
import TiktokIcon from './TiktokIcon';
import BarChart2Icon from './BarChart2Icon';
import BarChartIcon from './BarChartIcon';
import BullseyeIcon from './BullseyeIcon';
import BusinessLitigationIcon from './BusinessLitigationIcon';
import CriminalDefenseIcon from './CriminalDefenseIcon';
import DataUsageIcon from './DataUsageIcon';
import DocIcon from './DocIcon';
import DocumentAddIcon from './DocumentAddIcon';
import EmploymentLawIcon from './EmploymentLawIcon';
import EstatePlanningIcon from './EstatePlanningIcon';
import FamilyLawIcon from './FamilyLawIcon';
import GearIcon from './GearIcon';
import ImmigrationIcon from './ImmigrationIcon';
import JusticeScaleIcon from './JusticeScaleIcon';
import LinkIcon from './LinkIcon';
import MapPinIcon from './MapPinIcon';
import OfficeIcon from './OfficeIcon';
import TargetIcon from './TargetIcon';
import TrendIcon from './TrendIcon';
import MedicalMalpracticeIcon from './MedicalMalpracticeIcon';
import PersonalInjuryIcon from './PersonalInjuryIcon';
import CheckCircleIcon from './CheckCircleIcon';

export const CUSTOM_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
	// social media icons
	checkCircle: CheckCircleIcon,
	facebook: FacebookIcon,
	twitter: TwitterXIcon,
	instagram: InstagramIcon,
	linkedin: LinkedinIcon,
	youtube: YoutubeIcon,
	github: GithubIcon,
	tiktok: TiktokIcon,
	// process icons
	doc: DocIcon,
	bullseye: BullseyeIcon,
	gear: GearIcon,
	chart: BarChartIcon,
	'data-usage': DataUsageIcon,
	'justice-scale': JusticeScaleIcon,
	'document-add': DocumentAddIcon,
	chart2: BarChart2Icon,
	'map-pin': MapPinIcon,
	target: TargetIcon,
	office: OfficeIcon,
	link: LinkIcon,
	trend: TrendIcon,
	// practice area icons
	'personal-injury': PersonalInjuryIcon,
	'criminal-defense': CriminalDefenseIcon,
	'family-law': FamilyLawIcon,
	'employment-law': EmploymentLawIcon,
	immigration: ImmigrationIcon,
	'estate-planning': EstatePlanningIcon,
	'business-litigation': BusinessLitigationIcon,
	'medical-malpractice': MedicalMalpracticeIcon,
};
