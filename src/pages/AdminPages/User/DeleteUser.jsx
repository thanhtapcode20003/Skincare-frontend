import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import PropTypes from "prop-types";

function DeleteUser({ visible, onHide, onConfirm, userId }) {
	return (
		<div className="deleteUser">
			<Dialog
				visible={visible}
				onHide={onHide}
				header="Delete User"
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
							onClick={() => onConfirm(userId)}
						/>
					</div>
				}
				style={{ width: "30rem" }}
			>
				<p>Are you sure you want to delete this user?</p>
			</Dialog>
		</div>
	);
}
DeleteUser.propTypes = {
	visible: PropTypes.bool.isRequired,
	onHide: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	userId: PropTypes.string,
};

export default DeleteUser;
