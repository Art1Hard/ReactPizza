import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
	const { id } = useParams();
	const [pizzaNotFound, setPizzaNotFound] = useState<number>();

	useEffect(() => {
		const fetchPizza = async () => {
			try {
				const url: string = `https://66966ea20312447373c28363.mockapi.io/items/${id}`;
				const { data } = await axios.get(url);
				setPizza(data);
			} catch (error) {
				if (axios.isAxiosError(error)) setPizzaNotFound(error.request.status);
			}
		};

		fetchPizza();
	}, [id]);

	if (pizzaNotFound) {
		return <NotFound />;
	}

	if (!pizza) {
		return <div className="container">Загрузка пиццы...</div>;
	}

	return (
		<div className="container">
			<img src={pizza.imageUrl} alt="" />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price} ₽</h4>
			<Link to="/" className="button button--outline button--add go-back-btn">
				<svg
					width="8"
					height="14"
					viewBox="0 0 8 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M7 13L1 6.93015L6.86175 1"
						stroke="#D3D3D3"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>

				<span>Вернуться назад</span>
			</Link>
		</div>
	);
};

export default FullPizza;
