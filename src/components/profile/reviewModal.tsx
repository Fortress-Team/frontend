import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { api } from "../../lib";

interface ReviewData {
  score: number;
  strengths: string[];
  missing: string[];
  recommendations: string[];
}

interface ProfileReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const ProfileReviewModal: React.FC<ProfileReviewModalProps> = ({ isOpen, onClose, userId }) => {
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<ReviewData | null>(null);
  const [hasFetched, setHasFetched] = useState(false); 

const handleReview = React.useCallback(async () => {
  if (!userId) return;

  setLoading(true);
  try {
    const res = await api.post<{ message: string; data: ReviewData | null }>(
      `/ai/review`,
      { userId }
    );

    if (res.data.data) {
      setReview(res.data.data);
      toast.success("Profile reviewed successfully!");
    } else {
      toast("No review data returned for this profile.");
      setReview(null);
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to review profile";
    toast.error(errorMessage);
    setReview(null);
  } finally {
    setLoading(false);
    setHasFetched(true);
  }
}, [userId]);


  // Auto-fetch review when modal opens
useEffect(() => {
  if (isOpen && !hasFetched) {
    handleReview();
  }
}, [isOpen, hasFetched, handleReview]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold text-2xl"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">Profile Review</h2>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex items-center gap-3 text-gray-700">
            <Loader2 className="animate-spin" size={20} /> Fetching review...
          </div>
        )}

        {/* Review Content */}
        {!loading && review && (
          <div className="mt-4 space-y-3 text-gray-800">
            <p>
              <strong>Score:</strong> {review.score}/100
            </p>
            <p>
              <strong>Strengths:</strong> {review.strengths.length ? review.strengths.join(", ") : "No strengths listed."}
            </p>
            <p>
              <strong>Missing/Weak Areas:</strong> {review.missing.length ? review.missing.join(", ") : "No weak areas noted."}
            </p>
            <p>
              <strong>Recommendations:</strong> {review.recommendations.length ? review.recommendations.join(", ") : "No recommendations provided."}
            </p>
          </div>
        )}

        {/* Fallback message if review is empty */}
        {!loading && hasFetched && !review && (
          <p className="mt-4 text-gray-500 text-center">
            No review available for this profile.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileReviewModal;
