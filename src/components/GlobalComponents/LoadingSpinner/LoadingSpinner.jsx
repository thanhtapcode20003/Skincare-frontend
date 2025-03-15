// components/LoadingSpinner.jsx
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
	return (
		<div className={styles.loadingOverlay}>
			<div className={styles.spinner}></div>
		</div>
	);
};

export default LoadingSpinner;
