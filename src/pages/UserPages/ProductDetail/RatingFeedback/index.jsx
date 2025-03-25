import { Rating } from "@mui/material";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";
import styles from "./RatingFeedback.module.scss";
import PropTypes from "prop-types";
import { useEffect, useRef, useState, useCallback } from "react";
import {
	createRatingFeedback,
	getRatingsFeedbackByProduct,
	deleteRatingFeedback,
} from "../../../../api/ratingFeedbackService";
import { useAuth } from "../../../../utils/useAuth";

import LoadingSpinner from "../../../../components/GlobalComponents/LoadingSpinner/LoadingSpinner";

const RatingFeedback = ({ productId }) => {
	const toast = useRef(null);
	const { userId, isAuthenticated } = useAuth();

	// State for ratings and feedback
	const [ratingsFeedback, setRatingsFeedback] = useState([]);
	const [userFeedback, setUserFeedback] = useState(null); // User's own feedback
	const [newRating, setNewRating] = useState(0);
	const [newComment, setNewComment] = useState("");
	const [feedbackLoading, setFeedbackLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false); // For submit button loading
	const [deleting, setDeleting] = useState(false); // For delete button loading

	// Fetch all ratings and feedback for the product
	const fetchRatingsFeedback = useCallback(async () => {
		try {
			setFeedbackLoading(true);
			const response = await getRatingsFeedbackByProduct(productId);
			console.log(response);

			// Ensure ratingsFeedback is always an array
			const feedbackData = response || [];
			setRatingsFeedback(feedbackData);

			// Find the user's own feedback if authenticated
			console.log(isAuthenticated);
			console.log(userId);
			console.log(productId);

			if (isAuthenticated && userId) {
				const userFeedback = feedbackData.find((fb) => fb.userId === userId);
				console.log("userFeedback: ", userFeedback);

				setUserFeedback(userFeedback || null);
				if (!userFeedback) {
					// Reset form if no user feedback exists
					setNewRating(0);
					setNewComment("");
				}
			}
		} catch (err) {
			console.error("Error fetching ratings and feedback:", err);
			setRatingsFeedback([]); // Set to empty array on error
			setUserFeedback(null);
			toast.current.show({
				severity: "error",
				summary: "Error",
				detail: "Failed to load ratings and feedback.",
				life: 3000,
			});
		} finally {
			setFeedbackLoading(false);
		}
	}, [productId, isAuthenticated, userId]);

	useEffect(() => {
		fetchRatingsFeedback();
	}, [fetchRatingsFeedback]);

	// Handle Create Feedback
	const handleSubmitFeedback = async () => {
		if (!isAuthenticated) {
			toast.current.show({
				severity: "warn",
				summary: "Unauthorized",
				detail: "Please log in to submit a rating and feedback.",
				life: 3000,
			});
			return;
		}

		if (newRating === 0 || !newComment.trim()) {
			toast.current.show({
				severity: "warn",
				summary: "Invalid Input",
				detail: "Please provide a rating and a comment.",
				life: 3000,
			});
			return;
		}

		setSubmitting(true);
		try {
			// Simulate 1-second loading
			await new Promise((resolve) => setTimeout(resolve, 1000));

			const feedbackData = {
				productId: productId,
				rating: newRating,
				comment: newComment,
			};

			// Create new feedback
			const response = await createRatingFeedback(feedbackData);
			if (response.status === 200) {
				setUserFeedback(response.data);
				setRatingsFeedback((prev) => [...prev, response.data]);
				toast.current.show({
					severity: "success",
					summary: "Success",
					detail: "Feedback submitted successfully.",
					life: 2000,
				});

				// Reset form
				setNewRating(0);
				setNewComment("");
			} else {
				throw new Error(response.data.message || "Failed to submit feedback.");
			}
		} catch (err) {
			console.error("Error submitting feedback:", err);
			toast.current.show({
				severity: "error",
				summary: "Error",
				detail: "Failed to submit feedback.",
				life: 3000,
			});
		} finally {
			setSubmitting(false);
		}
	};

	// Handle Delete Feedback
	const handleDeleteFeedback = async () => {
		if (!isAuthenticated) {
			toast.current.show({
				severity: "warn",
				summary: "Unauthorized",
				detail: "Please log in to delete your feedback.",
				life: 3000,
			});
			return;
		}

		setDeleting(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));

			console.log(userFeedback.feedbackId);

			const response = await deleteRatingFeedback(userFeedback.feedbackId);
			if (response.status === 200) {
				await fetchRatingsFeedback();
				toast.current.show({
					severity: "success",
					summary: "Success",
					detail: response.data.message || "Feedback deleted successfully.",
					life: 2000,
				});
			} else {
				throw new Error(response.data.message || "Failed to delete feedback.");
			}
		} catch (err) {
			console.error("Error deleting feedback:", err);
			toast.current.show({
				severity: "error",
				summary: "Error",
				detail: err.message || "Failed to delete feedback.",
				life: 3000,
			});
		} finally {
			setDeleting(false);
		}
	};

	// Render skeleton for feedback form
	const renderFeedbackFormSkeleton = () => (
		<div className="mb-6">
			<Skeleton width="200px" height="1.5rem" className="mb-2" />
			<div className="flex flex-col gap-3">
				<Skeleton width="150px" height="1rem" className="mb-2" />
				<Skeleton width="100%" height="80px" className="mb-2" />
				<Skeleton width="150px" height="40px" />
			</div>
		</div>
	);

	const renderFeedbackListSkeleton = () => (
		<div className="mt-5 bg-white shadow-md rounded-lg p-4">
			<Skeleton width="200px" height="2rem" className="mb-4" />
			{Array(3)
				.fill()
				.map((_, index) => (
					<div key={index} className="mb-4">
						<Skeleton width="150px" height="1rem" className="mb-2" />
						<Skeleton width="100px" height="1rem" className="mb-2" />
						<Skeleton width="80%" height="1rem" />
					</div>
				))}
		</div>
	);

	return (
		<div className={styles.ratingFeedbackContainer}>
			<Toast ref={toast} />
			<h2 className="text-2xl font-bold mb-4">Ratings & Feedback</h2>

			{/* Feedback Form */}
			{feedbackLoading ? (
				renderFeedbackFormSkeleton()
			) : isAuthenticated ? (
				<div className="mb-6">
					<h3 className="text-lg font-semibold mb-2">Add Your Feedback</h3>
					<div className="flex flex-col gap-3">
						<div>
							<Rating
								name="new-rating"
								value={newRating}
								precision={1}
								onChange={(event, value) => setNewRating(value)}
							/>
						</div>
						<InputTextarea
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							rows={3}
							className="w-full"
							placeholder="Write your feedback here..."
						/>
						<div className="flex gap-2">
							<Button
								label="Submit Feedback"
								className="bg-global"
								onClick={handleSubmitFeedback}
								loading={submitting}
							/>
						</div>
					</div>
				</div>
			) : null}

			{/* Feedback List */}
			{feedbackLoading ? (
				renderFeedbackListSkeleton()
			) : ratingsFeedback.length === 0 ? (
				<p>No feedback available for this product.</p>
			) : (
				<div>
					{ratingsFeedback.map((feedback) => (
						<div
							key={feedback.feedbackId}
							className="border-b border-gray-200 py-4"
						>
							<div className="flex flex-row items-center gap-2 mb-2">
								<Rating
									name={`rating-${feedback.feedbackId}`}
									value={feedback.rating}
									precision={1}
									size="small"
									readOnly
								/>
								<span className="text-sm text-gray-600">
									by {feedback.userName || `User ${feedback.userId}`}
								</span>
							</div>
							<p className="text-gray-700">{feedback.comment}</p>
							{isAuthenticated && feedback.userId === userId && (
								<div className="mt-2 flex gap-2">
									{deleting ? (
										<LoadingSpinner />
									) : (
										<Button
											label="Delete"
											severity="danger"
											text
											onClick={handleDeleteFeedback}
										/>
									)}
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

RatingFeedback.propTypes = {
	productId: PropTypes.string.isRequired,
};

export default RatingFeedback;
