import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import { DefaultLayout } from "./components/Layout/";
import ScrollToTop from "./components/GlobalComponents/ScrollToTop";
import ProtectedRoute from "./components/GlobalComponents/ProtectedRoute";

function App() {
	return (
		<Router>
			<div className="app">
				<ScrollToTop />
				<Routes>
					{publicRoutes.map((route, index) => {
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
