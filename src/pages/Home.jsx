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

	const { searchValue } = useContext(SearchContext);

	const { categoryIndex, sort } = useSelector((state) => state.filter);
	const sortIsDesc = useSelector((state) => state.filter.isDesc);
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
		if (categoryIndex !== 0) url.searchParams.append("category", categoryIndex);

		url.searchParams.append("sortby", sort.sortProperty);
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
	}, [categoryIndex, sort, sortIsDesc, searchValue]);

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
				<Sort />
			</div>
			<h2 className="content__title">{categories[categoryIndex]} пиццы</h2>
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
