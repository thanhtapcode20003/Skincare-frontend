import { useEffect, useState, useCallback, useRef } from "react";
// import { decode } from "../../../../../utils/axiosClient";
import { useAuth } from "../../../../../utils/useAuth";

import Logo from "./Logo";
import Search from "./Search";
import ProfileButton from "./ProfileButton";
import ProfileButtonNotSigned from "./ProfileButton/ProfileButtonNotSigned";
import CartButton from "./CartButton";

import Register from "../Register";
import Login from "../Login";

function Header() {
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
	const [authMode, setAuthMode] = useState("login");
	const [isAuthenticated, setIsAuthenticated] = useState(
		!!localStorage.getItem("token")
	);
	const { logout } = useAuth();
	const TIMEOUT_DURATION = 600000; // 1h
	const inactivityTimerRef = useRef(null);

	// Function to reset the timer
	const resetInactivityTimer = useCallback(() => {
		if (isAuthenticated) {
			// Clear any existing timer
			clearTimeout(inactivityTimerRef.current);

			// Set a new timer
			inactivityTimerRef.current = setTimeout(() => {
				// Remove token and update authentication state
				localStorage.removeItem("token");
				setIsAuthenticated(false);
				logout();
				console.log("Session expired due to inactivity");
			}, TIMEOUT_DURATION);
		}
	}, [isAuthenticated, logout]);

	// Set up event listeners for user activity
	useEffect(() => {
		// Events that indicate user activity
		const activityEvents = [
			"mousedown",
			"mousemove",
			"keypress",
			"scroll",
			"touchstart",
		];

		// Add event listeners for each activity event
		activityEvents.forEach((event) => {
			document.addEventListener(event, resetInactivityTimer);
		});

		// Initial setup of the inactivity timer
		resetInactivityTimer();

		// Cleanup event listeners on component unmount
		return () => {
			activityEvents.forEach((event) => {
				document.removeEventListener(event, resetInactivityTimer);
			});
			clearTimeout(inactivityTimerRef.current);
		};
	}, [resetInactivityTimer]);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setIsAuthModalOpen(false);
			setIsAuthenticated(true);
		}
	}, []);

	const toggleAuthModal = (mode = "login") => {
		setAuthMode(mode);
		setIsAuthModalOpen(true);
	};

	const handleLoginSuccess = (token) => {
		localStorage.setItem("token", token);
		setIsAuthenticated(true);
		setIsAuthModalOpen(false);
		resetInactivityTimer(); // Reset the timer when user logs in
	};

	const handleRegisterSuccess = () => {
		setAuthMode("login");
	};

	return (
		<header className="header-wrapper fixed top-0 w-full z-500 bg-global shadow-md">
			<div className="container mx-auto px-4 py-2 flex items-center">
				<div className="flex flex-row items-center justify-around w-full max-w-7xl gap-x-8 ">
					<div className="flex items-center gap-x-4 mx-auto">
						<Logo />
						<Search />
					</div>

					{/* right header */}
					<div className="flex items-center gap-x-6 text-stone-100">
						{/* Profile */}
						{isAuthenticated ? (
							<ProfileButton />
						) : (
							<div>
								<ProfileButtonNotSigned
									onClick={() => toggleAuthModal("login")}
								/>
								{isAuthModalOpen &&
									(authMode === "login" ? (
										<Login
											onLoginSuccess={handleLoginSuccess}
											onSignUpClick={() => toggleAuthModal("register")}
											onClose={() => setIsAuthModalOpen(false)}
										/>
									) : (
										<Register
											onRegisterSuccess={handleRegisterSuccess}
											onLoginClick={() => toggleAuthModal("login")}
											onClose={() => setIsAuthModalOpen(false)}
										/>
									))}
							</div>
						)}
						{/* Cart */}
						<CartButton />
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
