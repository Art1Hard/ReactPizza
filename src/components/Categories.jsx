import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/scss";

import { useSelector, useDispatch } from "react-redux";
import { setCatValue } from "../redux/slices/filterSlice";

function Categories() {
	const swiperRef = useRef(null);

	const filterIndex = useSelector((state) => state.filter.value);
	const dispatch = useDispatch();

	console.log("Categories reload");

	const categories = [
		"Все",
		"Мясные",
		"Вегетарианские",
		"Гриль",
		"Острые",
		"Закрытые",
	];

	return (
		<div className="categories">
			<ul>
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
					ref={swiperRef}>
					{categories.map((name, index) => (
						<SwiperSlide key={index}>
							<li
								onClick={() => {
									dispatch(setCatValue(index));
									swiperRef.current.swiper.slideTo(index);
								}}
								className={filterIndex === index ? "active" : ""}>
								{name}
							</li>
						</SwiperSlide>
					))}
				</Swiper>
			</ul>
		</div>
	);
}

export default Categories;
