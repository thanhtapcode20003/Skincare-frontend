import { Card } from "primereact/card";
import { Image } from "primereact/image";

const About = () => {
	const teamMembers = [
		{
			name: "John Doe",
			role: "Founder & CEO",
			image: "/images/team/member1.jpg",
			description:
				"Expert in skincare formulation with 10+ years of experience.",
		},
		{
			name: "Jane Smith",
			role: "Lead Dermatologist",
			image: "/images/team/member2.jpg",
			description: "Board-certified dermatologist specializing in skin health.",
		},
		// Add more team members as needed
	];

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Hero Section */}
			<section className="mb-16 text-center">
				<h1 className="text-4xl font-bold mb-6">About Our Skincare Journey</h1>
				<p className="text-xl text-gray-600 max-w-3xl mx-auto">
					Dedicated to providing the highest quality skincare products that
					enhance your natural beauty and promote healthy skin.
				</p>
			</section>

			{/* Mission Statement */}
			<section className="mb-16">
				<Card className="bg-white shadow-lg">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="flex flex-col justify-center">
							<h2 className="text-3xl font-bold mb-4">Our Mission</h2>
							<p className="text-gray-600">
								We believe everyone deserves healthy, radiant skin. Our mission
								is to create effective, sustainable skincare solutions using the
								finest natural ingredients and cutting-edge science.
							</p>
						</div>
					</div>
				</Card>
			</section>

			{/* Values Section */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<Card className="text-center p-6">
						<i className="pi pi-check-circle text-4xl text-green-500 mb-4"></i>
						<h3 className="text-xl font-bold mb-2">Quality</h3>
						<p className="text-gray-600">
							We never compromise on the quality of our ingredients and
							formulations.
						</p>
					</Card>
					<Card className="text-center p-6">
						<i className="pi pi-heart-fill text-4xl text-red-500 mb-4"></i>
						<h3 className="text-xl font-bold mb-2">Sustainability</h3>
						<p className="text-gray-600">
							Committed to eco-friendly practices and sustainable packaging
							solutions.
						</p>
					</Card>
					<Card className="text-center p-6">
						<i className="pi pi-users text-4xl text-blue-500 mb-4"></i>
						<h3 className="text-xl font-bold mb-2">Community</h3>
						<p className="text-gray-600">
							Building a community of skincare enthusiasts and experts.
						</p>
					</Card>
				</div>
			</section>

			{/* Team Section */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{teamMembers.map((member, index) => (
						<Card key={index} className="text-center">
							<Image
								src={member.image}
								alt={member.name}
								className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
							/>
							<h3 className="text-xl font-bold mb-2">{member.name}</h3>
							<p className="text-gray-500 mb-2">{member.role}</p>
							<p className="text-gray-600">{member.description}</p>
						</Card>
					))}
				</div>
			</section>

			{/* Contact Section */}
			<section className="text-center">
				<h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
				<p className="text-xl text-gray-600 mb-4">
					Have questions? We love to hear from you.
				</p>
				<div className="flex justify-center gap-4">
					<i className="pi pi-envelope text-2xl cursor-pointer"></i>
					<i className="pi pi-facebook text-2xl cursor-pointer"></i>
					<i className="pi pi-instagram text-2xl cursor-pointer"></i>
					<i className="pi pi-twitter text-2xl cursor-pointer"></i>
				</div>
			</section>
		</div>
	);
};

export default About;
