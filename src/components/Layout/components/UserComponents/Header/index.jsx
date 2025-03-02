import { useEffect, useState } from "react";

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

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setIsAuthModalOpen(false);
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
	};

	const handleRegisterSuccess = () => {
		setAuthMode("login");
	};

	return (
		<div className="header-wrapper fixed top-0 w-full z-10000">
			<div className="header px-10 py-2 bg-global ">
				<div className="row ">
					<div className="container flex flex-row justify-center gap-x-24">
						{/* logo */}
						<Logo />

						{/* search */}
						<Search />

						{/* right header */}
						<div className="right-header w-80 flex flex-initial justify-center items-center gap-x-16 text-stone-100 ">
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
			</div>
		</div>
	);
}

export default Header;
