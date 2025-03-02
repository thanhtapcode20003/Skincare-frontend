import PropTypes from "prop-types";
import Header from "../components/UserComponents/Header";
import Container from "../components/UserComponents/container";
import Footer from "../components/UserComponents/Footer";
import BannerSection from "../components/UserComponents/BannerSection";

function HomeLayout({ children }) {
	return (
		<div>
			<div className="main-header">
				<Header />
				<Container />
				<BannerSection />
			</div>
			<div className="container">
				<div className="content">{children}</div>
			</div>
			<Footer />
		</div>
	);
}

HomeLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
export default HomeLayout;
