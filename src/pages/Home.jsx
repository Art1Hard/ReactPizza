import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";

const Home = ({ searchValue }) => {
	const [pizzas, setPizzas] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [categoryId, setCategoryId] = useState(0);
	const [sorts, setSorts] = useState({ name: "популярности", sortProperty: "rating" });
	const [sortIsDesc, setSortIsDesc] = useState(false);

	const categories = [
		'Все',
		'Мясные',
		'Вегетарианские',
		'Гриль',
		'Острые',
		'Закрытые'
	]

	useEffect(() => {

		const url = new URL("https://66966ea20312447373c28363.mockapi.io/items");
		if (categoryId !== 0)
			url.searchParams.append('category', categoryId);

		url.searchParams.append('sortby', sorts.sortProperty);
		sortIsDesc ? url.searchParams.append('order', 'desc') : url.searchParams.append('order', 'asc');

		if (searchValue)
			url.searchParams.append('title', searchValue);

		setIsLoading(true);
		fetch(url)
			.then(response => response.json())
			.then(json => {
				if (json !== "Not found")
					setPizzas(json)
				else
					setPizzas([]);

				setIsLoading(false);
			})
		window.scrollTo(0, 0);
	}, [categoryId, sorts, sortIsDesc, searchValue])

	const pizzaBlocks = pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

	const pizzaSkeletons = [...new Array(3)].map((_, index) => <PizzaSkeleton key={index} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} setValue={setCategoryId} />
				<Sort value={sorts} setValue={setSorts} isDesc={sortIsDesc} setIsDesc={setSortIsDesc} />
			</div>
			<h2 className="content__title">{categories[categoryId]} пиццы</h2>
			<div className="content__items">
				{
					isLoading ?
						pizzaSkeletons :
						!pizzas.length ?
							<h3 style={{ textAlign: "left" }}>Пиццы не найдены...</h3> :
							pizzaBlocks
				}
			</div>
		</div>
	);
}

export default Home;