import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
	<ContentLoader
		speed={1}
		width={280}
		height={466}
		viewBox="0 0 280 466"
		backgroundColor="#c9c9c9"
		foregroundColor="#bfbfbf"
	>
		<rect x="0" y="266" rx="10" ry="10" width="280" height="27" />
		<circle cx="135" cy="127" r="122" />
		<rect x="-1" y="312" rx="10" ry="10" width="280" height="88" />
		<rect x="-1" y="425" rx="10" ry="10" width="110" height="35" />
		<rect x="129" y="425" rx="10" ry="10" width="150" height="35" />
	</ContentLoader>
)

export default Skeleton