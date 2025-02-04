import { useEffect, useState } from "react";

import Logo from "./Logo";
import Search from "./Search";
import ProfileButton from "./ProfileButton/ProfileButton";
import ProfileButtonNotSigned from "./ProfileButton/ProfileButtonNotSigned";
import CartButton from "./CartButton";
import Login from "../Login";

function Header() {
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(
		!!localStorage.getItem("token")
	);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setIsLoginOpen(false);
		}
	}, []);

	const toggleLogin = () => {
		setIsLoginOpen((prev) => !prev);
	};

	const handleLoginSuccess = (token) => {
		localStorage.setItem("token", token);
		setIsAuthenticated(true); // Update state
		setIsLoginOpen(false); // Close login modal
	};

	return (
		<div className="header-wrapper fixed top-0 w-full z-50">
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
									<ProfileButtonNotSigned onClick={toggleLogin} />
									{isLoginOpen && <Login onLoginSuccess={handleLoginSuccess} />}
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
