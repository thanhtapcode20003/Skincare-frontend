import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import styles from "./QuantityBox.module.scss";
import { useState } from "react";
import PropTypes from "prop-types";

const QuantityBox = ({ onQuantityChange }) => {
	const [inputValue, setInputValue] = useState(1);
	const Minus = () => {
		if (inputValue > 1) {
			if (inputValue > 1) {
				const newValue = inputValue - 1;
				setInputValue(newValue);
				if (onQuantityChange) onQuantityChange(newValue);
			}
		}
	};
	const Plus = () => {
		if (inputValue < 100) {
			const newValue = inputValue + 1;
			setInputValue(newValue);
			if (onQuantityChange) onQuantityChange(newValue);
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

QuantityBox.propTypes = {
	onQuantityChange: PropTypes.func,
};

export default QuantityBox;
