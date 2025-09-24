export interface AmazonReview {
  id: string;
  reviewerName: string;
  rating: number;
  reviewDate: string;
  isVerifiedPurchase: boolean;
  reviewTitle: string;
  reviewText: string;
}

export const amazonBookReviews: AmazonReview[] = [
  {
    id: "dr-jaraha-review",
    reviewerName: "Dr. A. Jaraha",
    rating: 5,
    reviewDate: "June 18, 2023",
    isVerifiedPurchase: true,
    reviewTitle: "Very insightful!",
    reviewText: "Very insightful book! I found the chapters in this book extremely informative. It covers topics that every Dentist should know, but are rarely talked about in dental school or dental circles. It was a great read coming right out of dental school. I highly recommend."
  },
  {
    id: "technoguru-review",
    reviewerName: "Technoguru",
    rating: 5,
    reviewDate: "January 11, 2024",
    isVerifiedPurchase: false,
    reviewTitle: "Exceptional Value and Advice",
    reviewText: "In Dental Practice Transitions Handbook, Dr. Michael A. Njo deftly navigates the ever-changing landscape of dental practice transitions, providing insightful advice and guidance to dental professionals at any stage of their career. Dr. Njo's approach emphasizes the importance of careful planning and educated decision-making to ensure long-term success in a field that has seen significant changes in recent years. The ideal audience for Dental Practice Transitions Handbook is dental professionals at any stage of their career, particularly those who are considering a transition, such as a partnership, acquisition, or sale of a practice. I wholeheartedly recommend Dental Practice Transitions Handbook by Dr. Michael A. Njo."
  },
  {
    id: "amazon-customer-review",
    reviewerName: "Amazon Customer",
    rating: 5,
    reviewDate: "February 2, 2024",
    isVerifiedPurchase: false,
    reviewTitle: "Worth its weight in gold!",
    reviewText: "Dr. Njo is very knowledgable on all aspects of private practice dentistry. Reading this book will give you a lot of valuable insight to what decisions you should and shouldn't make in order to maximize your success in your dental career."
  },
  {
    id: "sloane-review",
    reviewerName: "Sloane",
    rating: 5,
    reviewDate: "January 11, 2024",
    isVerifiedPurchase: false,
    reviewTitle: "Great read!",
    reviewText: "I listened to the author lecture about this book and the topic. I have started reading it and am so thankful that I have the resource at my fingertips!"
  }
];