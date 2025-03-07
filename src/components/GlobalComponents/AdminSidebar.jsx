import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Button } from "primereact/button";
import { useState } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
// import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { getUserById, logout, updateUser } from '~/api/userService';
import { tokens } from "../../theme";
// import { decode } from '~/utils/axiosClient';
// import uploadFile from '~/utils/transferFile';

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
			<MenuItem
				active={selected === title}
				style={{
					color: colors.grey[100],
				}}
				onClick={() => setSelected(title)}
				icon={icon}
			>
				<Typography>{title}</Typography>
			</MenuItem>
		</Link>
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

	// Logout
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location = "/";
	};

	return (
		<Box
			sx={{
				"& .pro-sidebar-inner": {
					background: `${colors.primary[900]}!important`,
					height: "100%",
				},
				"& .pro-icon-wrapper": {
					backgroundColor: "transparent !important",
				},
				"& .pro-inner-item": {
					padding: "5px 35px 5px 20px !important",
				},
				"& .pro-inner-item:hover": {
					color: "#868dfb !important",
				},
				"& .pro-menu-item.active": {
					color: "#6870fa !important",
				},
				"& .MuiBox-root": {
					height: "100%",
					paddingBottom: "5%",
				},
			}}
		>
			<Sidebar collapsed={isCollapsed} className="h-full bg-white">
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
								justifyContent="space-between"
								alignItems="center"
								ml="15px"
							>
								<Typography variant="h6" color={colors.grey[100]}>
									ADMIN
								</Typography>
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
									Hoang Thanh
								</Typography>
								<Typography
									variant="h6"
									sx={{ fontWeight: "bold", color: "var(--clr-orange)" }}
								>
									Manager
								</Typography>
							</Box>
						</Box>
					)}

					{/* Menu Item */}
					<Box paddingLeft={isCollapsed ? undefined : "10%"}>
						<Typography
							variant="h6"
							color={colors.grey[300]}
							sx={{ m: "15px 0 5px 20px" }}
						>
							User
						</Typography>
						<Item
							title="Manage User"
							to="/home"
							icon={<PeopleOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Button
							onClick={handleLogout}
							className="ml-4 bg-amber-400 border-0 my-5 px-6"
							label="Log out"
							icon="pi pi-sign-out"
							size="small"
						/>
					</Box>
				</Menu>
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
