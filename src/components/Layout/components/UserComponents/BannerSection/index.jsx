import styles from "./BannerSection.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";

const NextArrow = ({ onClick }) => {
	return <FaChevronRight className={`${styles.slickNext}`} onClick={onClick} />;
};

const PrevArrow = ({ onClick }) => {
	return <FaChevronLeft className={styles.slickPrev} onClick={onClick} />;
};

NextArrow.propTypes = {
	onClick: PropTypes.func,
};

PrevArrow.propTypes = {
	onClick: PropTypes.func,
};

const BannerSection = () => {
	var settings = {
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnHover: false,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
	};

	return (
		<div className={`${styles.bannerSection}`}>
			<Slider {...settings}>
				<div className={`${styles.item}`}>
					<img
						className="w-full h-full object-cover"
						src="https://api.watsons.vn/medias/W9-2702-womensday-h-banner-web3-1170x528-VN.jpg?context=bWFzdGVyfGltYWdlc3wxMjQ3OTd8aW1hZ2UvanBlZ3xhREprTDJnMk5TOHhOakl4TVRjek9EYzFOVEV3TWk5WE9WOHlOekF5WDNkdmJXVnVjMlJoZVY5b0xXSmhibTVsY2kxM1pXSXpYekV4TnpCNE5USTRMVlpPTG1wd1p3fGI4OWRlNmI3YjY0ZjQ3NTdiNWM0OWVkZDk1YjEzNzA4YTUwZTAwZTMxYWM3NzFhZWU5ZjUwZTJiMGE4ODRlZDA"
						alt="banner"
					/>
				</div>
				<div className={`${styles.item}`}>
					<img
						className="w-full h-full object-cover"
						src="https://api.watsons.vn/medias/W8-2002-shoppingtips-h-banner-web3-1170x528-VI.jpg?context=bWFzdGVyfGltYWdlc3wyNDQ1NDd8aW1hZ2UvanBlZ3xhRGszTDJneU5pOHhOakUxTVRVMU5EY3hPVGMzTkM5WE9GOHlNREF5WDNOb2IzQndhVzVuZEdsd2MxOW9MV0poYm01bGNpMTNaV0l6WHpFeE56QjROVEk0WDFaSkxtcHdad3w2YWIxZGViZTc1NzBjY2NlZWQ1Y2I5ZjVmNWM4ZWRiODEyZWNiN2JlOWY2YmJjYmUwMjA2ZWEzYjAxNWJiMDkz"
						alt="banner"
					/>
				</div>
				<div className={`${styles.item}`}>
					<img
						className="w-full h-full object-cover"
						src="https://api.watsons.vn/medias/W8-2002-memberdeal-h-banner-web3-1170x528-VN.jpg?context=bWFzdGVyfGltYWdlc3wxNDM2Mzd8aW1hZ2UvanBlZ3xhR0UyTDJneVl5OHhOakUxTVRVMU5EVTRPRGN3TWk5WE9GOHlNREF5WDIxbGJXSmxjbVJsWVd4ZmFDMWlZVzV1WlhJdGQyVmlNMTh4TVRjd2VEVXlPQzFXVGk1cWNHY3wxYTQ1MzY3ODgwZTNhNzI0YmVlMzY5ZDA1Nzk4MDZiMzUwYTBhNGIzMmFjZWNjYmYzMTQwYjY5Y2I0ODNkYTM1"
						alt="banner"
					/>
				</div>
				<div className={`${styles.item}`}>
					<img
						className="w-full h-full object-cover"
						src="https://api.watsons.vn/medias/W8-2002-mainpro-h-banner-web3-1170x528-VN.jpg?context=bWFzdGVyfGltYWdlc3wxNzM4Njl8aW1hZ2UvanBlZ3xhRE16TDJnellTOHhOakUxTVRVMU5ERTVOVFE0Tmk5WE9GOHlNREF5WDIxaGFXNXdjbTlmYUMxaVlXNXVaWEl0ZDJWaU0xOHhNVGN3ZURVeU9DMVdUaTVxY0djfGVkYWVmZTQ2NmVhMTZiMzc1Mjk1YzEyODdmZmFjOGVkZjA2NDViZTQzNzZkNjFmZGU5OGI3NjkxNGVmMTBkMTg"
						alt="banner"
					/>
				</div>
				<div className={`${styles.item}`}>
					<img
						className="w-full h-full object-cover"
						src="https://api.watsons.vn/medias/h-banner-web3-1170x528-VN.jpg?context=bWFzdGVyfGltYWdlc3wzNTU2NDR8aW1hZ2UvanBlZ3xhRFJtTDJoa1ppOHhOakl4T0RrM05EY3hOVGt6TkM5b0xXSmhibTVsY2kxM1pXSXpYekV4TnpCNE5USTRMVlpPTG1wd1p3fDJjMmQ1MzQwYzdlYTc0Yzc0MGQ5MTI0OTM0NzFhMGZlMThmZDM5MTQxY2ZiNmFjZjM5Y2NkYmYyNjY1ODA2YTA"
						alt="banner"
					/>
				</div>
				<div className={`${styles.item}`}>
					<img
						className="w-full h-full object-cover"
						src="https://api.watsons.vn/medias/2-Hero-Banner-W1170-x-H528-VI.jpg?context=bWFzdGVyfGltYWdlc3wyNzY0OTl8aW1hZ2UvanBlZ3xhREl4TDJnNU1DOHhOakl4T1RRNE1UYzJOemsyTmk4eUlFaGxjbThnUW1GdWJtVnlJRmN4TVRjd0lIZ2dTRFV5T0NCV1NTNXFjR2N8YWVjYjIxOGFkMzNjYmI3MWI4MzJmZDg4ODRlYTg1Y2Q1MTk2MTUxMDgxMDI0YmY4YzZlMDRmZTNiMjZkYWQ4ZA"
						alt="banner"
					/>
				</div>
			</Slider>
		</div>
	);
};

export default BannerSection;
