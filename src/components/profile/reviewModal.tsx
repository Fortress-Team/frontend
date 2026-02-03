import React, { useState, useEffect, useCallback } from "react";
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

const ProfileReviewModal: React.FC<ProfileReviewModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<ReviewData | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  const handleReview = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const res = await api.post<{ message: string; data: ReviewData | null }>(
        "/ai/review",
        { userId }
      );

      if (res.data.data) {
        setReview(res.data.data);
        toast.success("Profile reviewed successfully!");
      } else {
        setReview(null);
        toast("No review data returned.");
      }
    } catch (error) {
      console.error(error);
      setReview(null);
      toast.error("Failed to review profile");
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  }, [userId]);

  useEffect(() => {
    if (isOpen && !hasFetched) {
      handleReview();
    }
  }, [isOpen, hasFetched, handleReview]);

  if (!isOpen) return null;

  const scoreColor =
    review && review.score < 50
      ? "bg-red-500"
      : review && review.score < 75
      ? "bg-blue-600"
      : "bg-green-600";

  const renderList = (items: string[]) => (
    <ul className="list-disc pl-5 space-y-1">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm py-5">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative shadow-lg max-h-[80vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold text-2xl"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-6">Profile Review</h2>

        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-3 text-gray-700">
            <Loader2 className="animate-spin" size={20} />
            Fetching review...
          </div>
        )}

        {/* Review */}
        {!loading && review && (
          <div className="space-y-6 text-gray-800">
            {/* Score */}
            <div className="flex items-center gap-3">
              <div
                className={`${scoreColor} text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg`}
              >
                {review.score}
              </div>
              <span className="text-sm text-gray-600">Overall Score</span>
            </div>

            {/* Strengths */}
            <div>
              <h3 className="font-semibold mb-2 text-gray-900">Strengths</h3>
              {review.strengths.length
                ? renderList(review.strengths)
                : <p className="text-gray-500">No strengths listed.</p>}
            </div>

            {/* Missing / Weak Areas */}
            <div>
              <h3 className="font-semibold mb-2 text-gray-900">
                Missing / Weak Areas
              </h3>
              {review.missing.length
                ? renderList(review.missing)
                : <p className="text-gray-500">No weak areas noted.</p>}
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="font-semibold mb-2 text-gray-900">
                Recommendations
              </h3>
              {review.recommendations.length
                ? renderList(review.recommendations)
                : <p className="text-gray-500">No recommendations provided.</p>}
            </div>
          </div>
        )}

        {/* Empty State */}
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
