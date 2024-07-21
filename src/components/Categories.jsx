import { useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/scss';

function Categories({ value, setValue }) {
	const swiperRef = useRef(null);

	const categories = [
		'Все',
		'Мясные',
		'Вегетарианские',
		'Гриль',
		'Острые',
		'Закрытые'
	]

	return (
		<div className="categories">
			<ul>
				<Swiper
					className='swiper-categories'
					modules={[Autoplay, FreeMode]}
					spaceBetween={10}
					slidesPerView='auto'
					freeMode
					autoplay={{
						delay: 4000,
						disableOnInteraction: true,
					}}
					ref={swiperRef}
				>
					{
						categories.map((name, index) =>
							<SwiperSlide key={index}>
								<li
									onClick={() => {
										setValue(index)
										swiperRef.current.swiper.slideTo(index);
									}}
									className={value === index ? 'active' : ''}>
									{name}
								</li>
							</SwiperSlide>)
					}
				</Swiper>
			</ul>
		</div>
	);
}

export default Categories;