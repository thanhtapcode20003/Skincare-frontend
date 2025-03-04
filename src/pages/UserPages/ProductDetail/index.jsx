import { Rating } from "@mui/material";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import styles from "./ProductDetail.module.scss";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

const ProductDetail = () => {
	return (
		<div className={styles.container}>
			<div className="flex flex-row mt-2 bg-white shadow-md rounded-lg p-4">
				{/* Img */}
				<div className="md:w-5/12 w-full">
					<div className="productZoom">
						<div className="productImg">
							<InnerImageZoom
								zoomType="hover"
								className="w-full h-auto object-cover"
								zoomScale={1}
								src={`https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-kem-chong-nang-vichy-thoang-nhe-khong-bong-dau-spf-50-50ml-1739260686.jpg`}
							/>
						</div>
					</div>
				</div>

				{/* Info */}
				<div className="md:w-7/12 w-full px-5">
					<div className="productName">
						<h1 className="capitalize">Kem Chống Nắng La Roche-Posay</h1>
					</div>
					<div className="flex flex-row items-center gap-1">
						<Rating
							name="size-small"
							precision={0.5}
							defaultValue={2}
							size="small"
							readOnly
						/>
						<span>25 ratings</span>
					</div>
					<div className="mt-3 flex flex-row items-center gap-10">
						<span className={styles.productPrice}>100.000 đ</span>
						<span className="bg-green-100 text-green-500 text-sm font-medium me-2 px-3 py-1 rounded-2xl">
							IN STOCK
						</span>
					</div>
					<div className="mt-3 flex flex-row items-center gap-10">
						<div
							className={`${styles.quantityDrop} flex flex-row items-center`}
						>
							<button className={`${styles.quantityButton}`}>
								<FaMinus />
							</button>
							<input className={styles.quantityInput} type="text" />
							<button className={`${styles.quantityButton}`}>
								<FaPlus />
							</button>
						</div>
						<button className={styles.addButton}>Add to Cart</button>
					</div>

					<div className="productDescription mt-5">
						<p>
							Kem Chống Nắng Vichy Capital Soleil Dry Touch Protective Face
							Fluid SPF50 UVB+UVA là sản phẩm kem chống nắng dành cho da hỗn
							hợp, da dầu đến từ thương hiệu dược mỹ phẩm Vichy. Với màng lọc
							Mexoryl SX - XL® độc quyền và chỉ số chống nắng SPF 50 giúp bảo vệ
							da trước tác hại của tia UVB và tia UVA. Dạng kem không màu, không
							gây bết dính hay nhờn rít, thông thoáng lỗ chân lông mà vẫn cung
							cấp đủ độ ẩm cho da sau khi thoa.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
