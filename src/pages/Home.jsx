import { useCallback, useEffect, useRef } from "react";
import Categories, { categories } from "../components/Categories";
import Sort, { sorts } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";

import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import {
	filterIsDescSelector,
	filterSelector,
	setFilters,
} from "../redux/slices/filterSlice";
import {
	error,
	fetchPizzas,
	loading,
	pizzaItemsSelector,
	pizzaStatusSelector,
} from "../redux/slices/pizzaSlice";
import { searchValueSelector } from "../redux/slices/searchSlice";

const Home = () => {
	const pizzas = useSelector(pizzaItemsSelector);
	const status = useSelector(pizzaStatusSelector);

	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const searchValue = useSelector(searchValueSelector);

	const { categoryIndex, sort } = useSelector(filterSelector);
	const sortIsDesc = useSelector(filterIsDescSelector);

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

	const getPizzas = useCallback(async () => {
		const url = new URL("https://66966ea20312447373c28363.mockapi.io/items");
		if (categoryIndex !== 0) url.searchParams.append("category", categoryIndex);

		url.searchParams.append("sortby", sort.sortProperty);

		sortIsDesc
			? url.searchParams.append("order", "desc")
			: url.searchParams.append("order", "asc");

		if (searchValue) url.searchParams.append("title", searchValue);

		dispatch(fetchPizzas(url));
	}, [categoryIndex, sort, sortIsDesc, searchValue, dispatch]);

	useEffect(() => {
		if (!isSearch.current) getPizzas();
		isSearch.current = false;
		window.scrollTo(0, 0);
	}, [getPizzas]);

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
				{status === loading ? (
					pizzaSkeletons
				) : status === error ? (
					<h3 style={{ textAlign: "left" }}>Пиццы не найдены...</h3>
				) : (
					pizzaBlocks
				)}
			</div>
		</div>
	);
};

export default Home;
