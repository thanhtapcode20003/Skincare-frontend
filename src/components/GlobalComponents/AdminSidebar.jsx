import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { tokens } from "../../theme";
import { useAuth } from "../../utils/useAuth";

import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SanitizerIcon from "@mui/icons-material/Sanitizer";
import LogoutIcon from "@mui/icons-material/Logout";

const Item = ({ title, to, icon, selected, setSelected }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const navigate = useNavigate();

	const handleClick = () => {
		setSelected(title);
		navigate(to);
	};

	return (
		<MenuItem
			active={selected === title}
			style={{
				color: colors.grey[100],
			}}
			onClick={handleClick}
			icon={icon}
		>
			<Typography>{title}</Typography>
		</MenuItem>
	);
};

// let role = null;
// if (localStorage.getItem('token')) {
//     role = decode(localStorage.getItem('token')).roles[0];
// }

const AdminSidebar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [selected, setSelected] = useState("User");
	const { username, role, logout } = useAuth();

	return (
		<Box>
			<Sidebar collapsed={isCollapsed} className="h-200 bg-white">
				<Menu iconShape="square">
					{/* LOGO AND MENU ICON */}
					<MenuItem
						onClick={() => setIsCollapsed(!isCollapsed)}
						icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
						style={{
							margin: "10px 0 20px 0",
							color: colors.grey[100],
						}}
					>
						{!isCollapsed && (
							<Box
								display="flex"
								justifyContent="right"
								alignItems="center"
								ml="15px"
							>
								{/* <Typography variant="h6" color={colors.grey[100]}>
									{role}
								</Typography> */}
								<IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
									<MenuOutlinedIcon />
								</IconButton>
							</Box>
						)}
					</MenuItem>

					{/* User Name */}
					{!isCollapsed && (
						<Box mb="25px">
							<Box textAlign="center">
								<Typography
									variant="h5"
									color={colors.grey[100]}
									fontWeight="bold"
									sx={{ m: "10px 0 0 0" }}
								>
									{username}
								</Typography>
								<Typography
									variant="h6"
									sx={{ fontWeight: "bold", color: "var(--clr-orange)" }}
								>
									{role}
								</Typography>
							</Box>
						</Box>
					)}

					{/* Menu Item */}
					<Box paddingLeft={isCollapsed ? undefined : "10%"}>
						{role === "Manager" && (
							<>
								<Typography
									variant="h6"
									color={colors.grey[300]}
									sx={{ m: "15px 0 5px 20px" }}
								>
									User
								</Typography>
								<Item
									title="Manage User"
									to="/home/user"
									icon={<PeopleOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
							</>
						)}
						{role === "Staff" && (
							<>
								<Typography
									variant="h6"
									color={colors.grey[300]}
									sx={{ m: "15px 0 5px 20px" }}
								>
									Product
								</Typography>
								<Item
									title="Manage Product"
									to="/product"
									icon={<SanitizerIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
							</>
						)}
					</Box>
				</Menu>
				<Box
					paddingLeft={isCollapsed ? undefined : "10%"}
					sx={{ margin: "20px 0", textAlign: "center" }}
				>
					<Button
						onClick={logout}
						variant="contained"
						startIcon={<LogoutIcon />}
						sx={{
							backgroundColor: "var(--clr-green)", // Use --clr-green
							color: "white",
							textTransform: "none", // Prevent uppercase text
							padding: "8px 16px",
						}}
					>
						Log out
					</Button>
				</Box>
			</Sidebar>
		</Box>
	);
};

export default AdminSidebar;

Item.propTypes = {
	title: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
	icon: PropTypes.element.isRequired,
	selected: PropTypes.string.isRequired,
	setSelected: PropTypes.func.isRequired,
};
