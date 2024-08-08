interface IPizzaBlock {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
}

export default IPizzaBlock;
