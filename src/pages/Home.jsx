import { useCallback, useEffect, useRef, useState } from "react";
import Categories, { categories } from "../components/Categories";
import Sort, { sorts } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../redux/slices/filterSlice";

const Home = () => {
	const [pizzas, setPizzas] = useState([]);
	const [isLoading, setLoading] = useState(false);

	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const searchValue = useSelector((state) => state.search.searchValue);

	const { categoryIndex, sort } = useSelector((state) => state.filter);
	const sortIsDesc = useSelector((state) => state.filter.isDesc);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	//* Если изменили параметры и был первый рендер то на следующий рендер
	useEffect(() => {
		if (isMounted.current) {
			//* функция записывает в адресную строку параметры
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryIndex,
				sortIsDesc,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryIndex, sort, sortIsDesc, navigate]);

	//* Если первый рендер, и в url есть параметры, то парсим URL-параметры и сохраняем в redux.
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			const sort = sorts.find(
				(obj) => obj.sortProperty === params.sortProperty
			);
			dispatch(setFilters({ ...params, sort }));
			isSearch.current = true;
		}
	}, [dispatch]);

	const fetchPizzas = useCallback(() => {
		const url = new URL("https://66966ea20312447373c28363.mockapi.io/items");
		if (categoryIndex !== 0) url.searchParams.append("category", categoryIndex);

		url.searchParams.append("sortby", sort.sortProperty);

		sortIsDesc
			? url.searchParams.append("order", "desc")
			: url.searchParams.append("order", "asc");

		if (searchValue) url.searchParams.append("title", searchValue);

		setLoading(true);

		axios
			.get(url)
			.then((res) => {
				setPizzas(res.data);
				setLoading(false);
			})
			.catch((error) => {
				if (error.response.status === 404) setPizzas([]);
				setLoading(false);
			});
	}, [categoryIndex, sort, sortIsDesc, searchValue]);

	useEffect(() => {
		if (!isSearch.current) fetchPizzas();
		isSearch.current = false;
		window.scrollTo(0, 0);
	}, [fetchPizzas]);

	const pizzaBlocks = pizzas.map((pizza) => (
		<PizzaBlock key={pizza.id} {...pizza} />
	));

	const pizzaSkeletons = [...new Array(4)].map((_, index) => (
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
