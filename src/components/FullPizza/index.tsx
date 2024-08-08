import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "../../pages/NotFound";
import styles from "./FullPizza.module.scss";

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
		<div className={`container ${styles.root}`}>
			<img className={styles.img} src={pizza.imageUrl} alt="" />
			<h2 className={styles.title}>{pizza.title}</h2>
			<h4 className={styles.price}>{pizza.price} ₽</h4>
			<Link
				to="/"
				className={`button button--outline button--add go-back-btn ${styles.buttonExit}`}>
				<span>Вернуться назад</span>
			</Link>
		</div>
	);
};

export default FullPizza;
