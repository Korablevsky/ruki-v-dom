import { CarouselCustom } from '@/entities/carousel-custom/carousel-custom'
import { Help } from '@/widgets/help/help'
import { HowWork } from '@/widgets/how-work/how-work'
import { WhyUs } from '@/widgets/why-us/why-us'
export default function Home() {
	return (
		<>
			<CarouselCustom />
			<WhyUs />
			<HowWork />
			<Help />
		</>
	)
}
