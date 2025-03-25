import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog"; // Import Dialog component
import { useState } from "react";

// Hardcoded news data (adapted for a skincare website)
const newsData = [
	{
		BlogId: 1,
		Title: "Top 5 Skincare Tips for Winter",
		Content:
			"**Sunscreen for Dry Skin**\nProtecting your skin from UV radiation is crucial, especially in winter when dry air can exacerbate skin sensitivity. Choose a sunscreen with hydrating ingredients like hyaluronic acid and ceramides to keep your skin moisturized while shielding it from harmful rays.\n\n**Q+A Squalane SPF50 Hydrating Facial Sunscreen**\nCreated specifically to nourish sensitive skin while shielding against the harmful effects of the sun, this Q+A Squalane SPF50 Hydrating Facial Sunscreen is lightweight, fast absorbing, and non-greasy, the hybrid mineral formula keeping your skin safe and free from irritation.\n\n**Sunscreen for Oily Skin**\nApplying thick and oily sunscreens to oily skin can lead to breakouts, so choosing a sunscreen that’s lightweight, non-comedogenic, mattifying, and balancing is essential to keep your skin even and free from shine and spots.\n\n**Oil-Free Sunscreens**\nOil-free sunscreens are an excellent choice when your skin is prone to oiliness, keeping your skin radiant and healthy while preventing breakouts and acne flare-ups.",
		PublishDate: "2025-03-01",
	},
	{
		BlogId: 2,
		Title: "Top 5 Natural Ingredients To Add To Your Skincare Routine",
		Content:
			"**Aloe Vera**\nLooking for natural skincare for dry skin? Aloe vera is a popular choice. Moisturising, anti-inflammatory, healing, and soothing, this antioxidant ingredient is rich in vitamins C and E, and mucopolysaccharides, helping your skin retain moisture and protecting it from damage.\n\n**Oxygenetix Blemish Control**\nAn aloe-vera-enriched breathable foundation, this Oxygenetix Blemish Control boosts your skin health as you wear it, minimising blemishes while concealing your complexion. Infused with salicylic acid, aloe vera, and vitamin E, it soothes skin irritation, redness, and inflammation and also protects your skin from UV radiation with the addition of SPF30.\n\n**Eminence Organic Coconut Age Corrective Moisturiser**\nProviding deep hydration, this Eminence Age Corrective Moisturiser boosts collagen levels by 25% in just six days, rejuvenating your skin to leave it lifted and firm. Enriched with chicory root, green apple plant stem cells, and coconut, this intensive moisturiser hydrates and plumps your skin and improves cell regeneration, reducing the visible signs of ageing.\n\n**Coco & Eve Like A Virgin Super Nourishing Coconut & Fig Hair Masque**\nRepairing your hair from the inside out, this coconut-enriched Coco & Eve hair masque revives dry and damaged hair, deeply nourishing and conditioning with its natural formula to leave your hair soft, smooth, and shiny.\n\n**Frank Body Coconut Coffee Scrub**\nCraving glowing skin? This coconut oil and ground robusta coffee bean-infused scrub exfoliates your skin, polishing away dead skin to tackle stretch marks, scars, and dry skin, boosting collagen production to leave your skin soft, shiny, and rejuvenated.",
		PublishDate: "2025-03-10",
	},
	{
		BlogId: 3,
		Title: "How to Build a Daily Skincare Routine",
		Content:
			"**Gentle Cleanser**\nStart your routine with a gentle cleanser to remove impurities without stripping your skin’s natural oils. This step ensures your skin is clean and ready for the next products.\n\n**CeraVe Hydrating Cleanser**\nPerfect for all skin types, this CeraVe Hydrating Cleanser gently removes dirt and oil while maintaining your skin’s natural barrier with ceramides and hyaluronic acid, leaving it soft and refreshed.\n\n**Toner**\nFollow with a toner to balance your skin’s pH and prep it for serums and moisturizers. Look for a toner with soothing ingredients like chamomile or rose water.\n\n**Serum**\nIncorporate a targeted serum, such as one with hyaluronic acid for hydration or niacinamide for oil control, to address your specific concerns.\n\n**Moisturizer and Sunscreen**\nFinish with a moisturizer to lock in hydration and a broad-spectrum sunscreen during the day to protect against UV damage.",
		PublishDate: "2025-03-15",
	},
];

function Blog() {
	const [selectedNews, setSelectedNews] = useState(null);
	const [dialogVisible, setDialogVisible] = useState(false);

	// Format the PublishDate for display
	const formatDate = (date) => {
		return new Date(date).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	// Handle "Read More" button click
	const handleReadMore = (news) => {
		setSelectedNews(news);
		setDialogVisible(true);
	};

	// Close the dialog
	const onHideDialog = () => {
		setDialogVisible(false);
		setSelectedNews(null);
	};

	// Dialog footer with a "Close" button
	const dialogFooter = (
		<div>
			<Button
				label="Close"
				icon="pi pi-times"
				onClick={onHideDialog}
				severity="secondary"
				text
			/>
		</div>
	);

	const renderContent = (content) => {
		const sections = content.split("\n\n");
		return sections.map((section, index) => {
			const [subheading, ...paragraph] = section.split("\n");
			const cleanedSubheading = subheading.replace(/\*\*/g, ""); // Remove ** markers
			return (
				<div key={index} className="mb-8">
					<p className="font-bold border-gray-800">{cleanedSubheading}</p>
					<p className="text-gray-700 text-base leading-relaxed mt-2">
						{paragraph.join("\n")}
					</p>
				</div>
			);
		});
	};

	return (
		<div className="p-4">
			<h2 className="text-4xl font-bold mb-6 text-center clr-orange">
				Skincare Blog
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{newsData.map((news) => (
					<Card
						key={news.BlogId}
						title={news.Title}
						subTitle={formatDate(news.PublishDate)}
						className="shadow-md hover:shadow-lg transition-shadow"
					>
						<p className="text-gray-600 mb-4 line-clamp-3">{news.Content}</p>
						<Button
							label="Read More"
							severity="secondary"
							text
							onClick={() => handleReadMore(news)}
						/>
					</Card>
				))}
			</div>

			{/* Dialog to display full blog post */}
			{selectedNews && (
				<Dialog
					header={selectedNews.Title}
					visible={dialogVisible}
					style={{ width: "50vw" }}
					footer={dialogFooter}
					onHide={onHideDialog}
					className="p-dialog-content"
				>
					<div className="mb-4">
						<p className="text-sm text-gray-500">
							Published on {formatDate(selectedNews.PublishDate)}
						</p>
					</div>
					<div
						className="text-gray-700 whitespace-pre-line"
						style={{ maxHeight: "60vh", overflowY: "auto" }}
					>
						{renderContent(selectedNews.Content)}{" "}
					</div>
				</Dialog>
			)}
		</div>
	);
}

export default Blog;
