import Logo from "./Logo";
import Search from "./Search";
import ProfileButton from "./ProfileButton";
import CartButton from "./CartButton";

function Header() {
	return (
		<div className="header-wrapper">
			<div className="header px-10 py-2 bg-emerald-800">
				<div className="row ">
					<div className="container flex flex-row justify-center gap-x-24">
						{/* logo */}
						<Logo />

						{/* search */}
						<Search />

						{/* right header */}
						<div className="right-header w-80 flex flex-initial justify-center items-center gap-x-16 text-stone-100 ">
							{/* Profile */}
							<ProfileButton />

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
