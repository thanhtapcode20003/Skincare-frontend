import { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { DefaultLayout } from "./components/Layout/";
import ScrollToTop from "./components/GlobalComponents/ScrollToTop";
import ProtectedRoute from "./components/GlobalComponents/ProtectedRoute";
import LoadingSpinner from "./components/GlobalComponents/LoadingSpinner/LoadingSpinner";
function App() {
	const [isInitialLoading, setIsInitialLoading] = useState(true);

	useEffect(() => {
		// Simulate initial loading (e.g., checking auth, fetching initial data, etc.)
		const initializeApp = async () => {
			try {
				// Simulate a 2-second delay for initial app loading
				await new Promise((resolve) => setTimeout(resolve, 1000));

				// Add any actual initialization logic here, e.g., checking auth status
				// const authStatus = await checkAuthStatus();
			} catch (error) {
				console.error("Error during app initialization:", error);
			} finally {
				setIsInitialLoading(false); // Stop loading after initialization
			}
		};

		initializeApp();
	}, []);

	// Show LoadingSpinner while the app is initially loading
	if (isInitialLoading) {
		return <LoadingSpinner />;
	}
	return (
		<Router>
			<div className="app">
				<ScrollToTop />
				<Routes>
					{routes.map((route, index) => {
						const Page = route.component;

						let Layout = DefaultLayout;

						if (route.layout) {
							Layout = route.layout;
						} else if (route.layout === null) {
							Layout = Fragment;
						}
						if (route.Auth === "private") {
							return (
								<Route
									key={index}
									path={route.path}
									element={
										<ProtectedRoute allowedRoles={["Staff", "Manager"]}>
											<Layout>
												<Page />
											</Layout>
										</ProtectedRoute>
									}
								/>
							);
						} else {
							return (
								<Route
									key={index}
									path={route.path}
									element={
										<Layout>
											<Page />
										</Layout>
									}
								/>
							);
						}
					})}
				</Routes>
			</div>
		</Router>
	);
}

export default App;
