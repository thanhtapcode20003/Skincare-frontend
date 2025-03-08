import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Box, Menu, MenuItem, IconButton } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../utils/useAuth";

const Topbar = () => {
	const { logout } = useAuth();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="flex-end" // Moves content to the right
			p={2}
			sx={{ width: "100%" }} // Ensures full width
			className="topbar"
		>
			{/* ICONS */}
			<Box display="flex">
				<div>
					<IconButton
						id="basic-button"
						aria-controls={open ? "basic-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
						onClick={handleClick}
					>
						<PersonOutlinedIcon />
					</IconButton>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						slotProps={{
							list: {
								"aria-labelledby": "basic-button",
							},
						}}
					>
						{/* <Link
							to="/home/settings/profile"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<MenuItem onClick={handleClose}>Edit Profile</MenuItem>
						</Link> */}
						<MenuItem onClick={logout}>Logout</MenuItem>
					</Menu>
				</div>
			</Box>
		</Box>
	);
};

export default Topbar;
