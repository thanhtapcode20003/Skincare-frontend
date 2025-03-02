import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Box, Button, IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Link } from "react-router-dom";

const Topbar = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location = "/";
	};

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
			{/* SEARCH BAR */}
			{/* <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box> */}
			{/* ICONS */}
			<Box display="flex">
				{/* <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                </IconButton> */}

				<div>
					<Button
						id="basic-button"
						aria-controls={open ? "basic-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
						onClick={handleClick}
					>
						<IconButton>
							<PersonOutlinedIcon />
						</IconButton>
					</Button>
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
						// MenuListProps={{
						// 	"aria-labelledby": "basic-button",
						// }}
					>
						<Link
							to="/home/settings/profile"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<MenuItem onClick={handleClose}>Edit Profile</MenuItem>
						</Link>
						<MenuItem onClick={handleLogout}>Logout</MenuItem>
					</Menu>
				</div>
			</Box>
		</Box>
	);
};

export default Topbar;
