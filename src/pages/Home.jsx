import { useContext, useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import { SearchContext } from "../App";

import { useSelector } from "react-redux";

const Home = () => {
	const [pizzas, setPizzas] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [sorts, setSorts] = useState({
		name: "популярности",
		sortProperty: "rating",
	});
	const [sortIsDesc, setSortIsDesc] = useState(false);
	const { searchValue } = useContext(SearchContext);

	const filterIndex = useSelector((state) => state.filter.value);
	console.log("Home reload");

	const categories = [
		"Все",
		"Мясные",
		"Вегетарианские",
		"Гриль",
		"Острые",
		"Закрытые",
	];

	useEffect(() => {
		const url = new URL("https://66966ea20312447373c28363.mockapi.io/items");
		if (filterIndex !== 0) url.searchParams.append("category", filterIndex);

		url.searchParams.append("sortby", sorts.sortProperty);
		sortIsDesc
			? url.searchParams.append("order", "desc")
			: url.searchParams.append("order", "asc");

		if (searchValue) url.searchParams.append("title", searchValue);

		setIsLoading(true);
		fetch(url)
			.then((response) => response.json())
			.then((json) => {
				if (json !== "Not found") setPizzas(json);
				else setPizzas([]);

				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [filterIndex, sorts, sortIsDesc, searchValue]);

	const pizzaBlocks = pizzas.map((pizza) => (
		<PizzaBlock key={pizza.id} {...pizza} />
	));

	const pizzaSkeletons = [...new Array(3)].map((_, index) => (
		<PizzaSkeleton key={index} />
	));

	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort
					value={sorts}
					setValue={setSorts}
					isDesc={sortIsDesc}
					setIsDesc={setSortIsDesc}
				/>
			</div>
			<h2 className="content__title">{categories[filterIndex]} пиццы</h2>
			<div className="content__items">
				{isLoading ? (
					pizzaSkeletons
				) : !pizzas.length ? (
					<h3 style={{ textAlign: "left" }}>Пиццы не найдены...</h3>
				) : (
					pizzaBlocks
				)}
			</div>
		</div>
	);
};

export default Home;
