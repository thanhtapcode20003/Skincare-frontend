import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import PropTypes from "prop-types";

function DeleteCategory({ visible, onHide, onConfirm, categoryId }) {
	const dialogFooter = (
		<div>
			<Button
				label="No"
				icon="pi pi-times"
				outlined
				onClick={onHide}
				className="mr-2"
			/>
			<Button
				label="Yes"
				icon="pi pi-check"
				severity="danger"
				onClick={() => onConfirm(categoryId)}
			/>
		</div>
	);

	return (
		<Dialog
			visible={visible}
			style={{ width: "32rem" }}
			breakpoints={{ "960px": "75vw", "641px": "90vw" }}
			header="Confirm"
			modal
			footer={dialogFooter}
			onHide={onHide}
		>
			<div className="confirmation-content">
				<i
					className="pi pi-exclamation-triangle mr-3"
					style={{ fontSize: "2rem" }}
				/>
				<span>Are you sure you want to delete this category?</span>
			</div>
		</Dialog>
	);
}

DeleteCategory.propTypes = {
	visible: PropTypes.bool.isRequired,
	onHide: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	categoryId: PropTypes.number.isRequired,
};

export default DeleteCategory;
