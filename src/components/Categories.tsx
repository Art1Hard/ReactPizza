import React, { useRef } from "react";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/scss";

import { useSelector, useDispatch } from "react-redux";
import {
	filterCategoryIdSelector,
	setCategoryIndex,
} from "../redux/slices/filterSlice";

export const categories = [
	"Все",
	"Мясные",
	"Вегетарианские",
	"Гриль",
	"Острые",
	"Закрытые",
];

const Categories: React.FC = () => {
	const swiperRef = useRef<SwiperRef>(null);

	const categoryIndex = useSelector(filterCategoryIdSelector);
	const dispatch = useDispatch();

	const swiperSlideTo = (
		swiperRef: React.RefObject<SwiperRef>,
		index: number
	) => swiperRef.current?.swiper.slideTo(index, 600);

	return (
		<div className="categories">
			<Swiper
				className="swiper-categories"
				modules={[Autoplay, FreeMode]}
				spaceBetween={10}
				slidesPerView="auto"
				freeMode
				autoplay={{
					delay: 4000,
					disableOnInteraction: true,
				}}
				ref={swiperRef}
				wrapperTag="ul">
				{categories.map((name, index) => (
					<SwiperSlide
						tag="li"
						key={index}
						onClick={() => {
							dispatch(setCategoryIndex(index));
							swiperSlideTo(swiperRef, index);
						}}
						className={categoryIndex === index ? "active big-letter" : ""}>
						{name}
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default Categories;
