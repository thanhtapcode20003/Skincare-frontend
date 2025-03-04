import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import styles from "./QuantityBox.module.scss";
import { useState } from "react";

const QuantityBox = () => {
	const [inputValue, setInputValue] = useState(1);
	const Minus = () => {
		if (inputValue > 1) {
			setInputValue(inputValue - 1);
		}
	};
	const Plus = () => {
		if (inputValue < 100) {
			setInputValue(inputValue + 1);
		}
	};

	return (
		<div className={`${styles.quantityDrop} flex flex-row items-center`}>
			<button className={`${styles.quantityButton}`} onClick={Minus}>
				<FaMinus />
			</button>
			<input
				className={styles.quantityInput}
				type="text"
				value={inputValue}
				readOnly
			/>
			<button className={`${styles.quantityButton}`} onClick={Plus}>
				<FaPlus />
			</button>
		</div>
	);
};

export default QuantityBox;
