import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/scss";

import { useSelector, useDispatch } from "react-redux";
import { setCategoryIndex } from "../redux/slices/filterSlice";

const categories = [
	"Все",
	"Мясные",
	"Вегетарианские",
	"Гриль",
	"Острые",
	"Закрытые",
];

function Categories() {
	const swiperRef = useRef(null);

	const categoryIndex = useSelector((state) => state.filter.categoryIndex);
	const dispatch = useDispatch();

	console.log("Categories reload");

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
							swiperRef.current.swiper.slideTo(index);
						}}
						className={categoryIndex === index ? "active" : ""}>
						{name}
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

export default Categories;
