import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import PropTypes from "prop-types";

function DeleteRoutine({ visible, onHide, onConfirm, routineId }) {
	return (
		<div className="deleteRoutine">
			<Dialog
				visible={visible}
				onHide={onHide}
				header="Delete Routine"
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
							onClick={() => onConfirm(routineId)}
						/>
					</div>
				}
				style={{ width: "30rem" }}
			>
				<p>Are you sure you want to delete this routine?</p>
			</Dialog>
		</div>
	);
}

DeleteRoutine.propTypes = {
	visible: PropTypes.bool.isRequired,
	onHide: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	routineId: PropTypes.string,
};

export default DeleteRoutine;
