import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import PropTypes from "prop-types";

function DeleteSkinType({ visible, onHide, onConfirm, skinTypeId }) {
	return (
		<div className="deleteSkinType">
			<Dialog
				visible={visible}
				onHide={onHide}
				header="Delete Skin Type"
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
							onClick={() => onConfirm(skinTypeId)}
						/>
					</div>
				}
				style={{ width: "30rem" }}
			>
				<p>Are you sure you want to delete this skin type?</p>
			</Dialog>
		</div>
	);
}
DeleteSkinType.propTypes = {
	visible: PropTypes.bool.isRequired,
	onHide: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	skinTypeId: PropTypes.string,
};

export default DeleteSkinType;
