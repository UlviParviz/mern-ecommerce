import React from 'react'
import avatar from '../../assets/images/default_avatar.jpg'
import { Rating } from "@mui/material";


const ListReviews = ({reviews}) => {
    
  return (
    <div className="reviews w-[80%] mx-auto py-3">
      <h3 className='text-center text-3xl font-bold mb-3'>All Reviews:</h3>
      {reviews?.map((review) => (
          <div key={review._id} className='border-b border-b-black'>
            <div  className="review-card py-3 mb-4 ">
              <div className="row">
                <div className="col-1">
                  <img
                    src={review?.user?.avatar ? review?.user?.avatar?.url : avatar }
                    alt="User Name"
                    width="50"
                    height="50"
                    className="rounded-circle"
                  />
                </div>
                <div className="col-11">
                  <div className="star-ratings">
                  <Rating
                      name="half-rating-read"
                      value={review?.rating}
                      readOnly
                    />
                  </div>
                  <p className="review_user capitalize">by {review?.user?.name}</p>
                  <p className="review_comment">{review?.comment}</p>
                </div>
              </div>
            </div>
            
        </div>
      ))}
    </div>
  )
}

export default ListReviews