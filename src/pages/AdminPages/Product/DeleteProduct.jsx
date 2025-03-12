import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import PropTypes from "prop-types";

function DeleteProduct({ visible, onHide, onConfirm, productId }) {
	return (
		<div className="deleteProduct">
			<Dialog
				visible={visible}
				onHide={onHide}
				header="Delete Product"
				footer={
					<div className="flex justify-between">
						<Button
							label="Close"
							icon="pi pi-times"
							severity="secondary"
							rounded
							raised
							className="p-button-md"
							onClick={onHide}
						/>
						<Button
							label="Delete"
							icon="pi pi-trash"
							severity="danger"
							rounded
							raised
							className="p-button-md"
							onClick={() => onConfirm(productId)}
						/>
					</div>
				}
				style={{ width: "30rem" }}
			>
				<p>Are you sure you want to delete this product?</p>
			</Dialog>
		</div>
	);
}
DeleteProduct.propTypes = {
	visible: PropTypes.bool.isRequired,
	onHide: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	productId: PropTypes.string,
};

export default DeleteProduct;
