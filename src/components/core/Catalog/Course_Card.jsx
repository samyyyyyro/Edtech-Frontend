import React, { useEffect, useState } from "react"
// Icons
// import { FaRegStar, FaStar } from "react-icons/fa"
// import ReactStars from "react-rating-stars-component"
import { Link } from "react-router-dom"
import { apiConnector } from "../../../services/apiConnector"
import { userData } from "../../../services/apis"

// import GetAvgRating from "../../../utils/avgRating"
// import RatingStars from "../../Common/RatingStars"

function Course_Card({ course, Height }) {
  // const avgReviewCount = GetAvgRating(course.ratingAndReviews)
  // console.log(course.ratingAndReviews)
  // const [avgReviewCount, setAvgReviewCount] = useState(0)
  
  const [user, setUser] = useState("");
  
  // useEffect(() => {
  //   const count = GetAvgRating(course.ratingAndReviews)
  //   setAvgReviewCount(count)
  // }, [course])
  // console.log("count............", avgReviewCount)


  useEffect(() => {
    ;(async () => {
      try {
        // console.log(course?.instructor)
        // console.log(userData.user_api)
        const userId = course?.instructor
        const res = await apiConnector("POST", 
          userData.user_api, 
          {
            userId : userId,
          }
        )
        const u = res.data.data.userData;
        setUser(u);
        // console.log(u) 
        
      } catch (error) {
        console.log("Could not fetch data.", error)
      }
    })()
  }, [course])

  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="">
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`${Height} w-full rounded-xl object-cover `}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-sm text-richblack-50">{user.firstName} {user.lastName}</p>
            <p className="text-xl text-yellow-5">{course?.courseName}</p>
            <p className="text-sm text-richblack-50">
              Skills you will gain : {course.whatYouWillLearn}
              
              {/* {course.courseContent[0].sectionName} */}
            </p>
            <div className="flex items-center gap-2">
              {/* <span className="text-yellow-5">{avgReviewCount || 0}</span> */}
              {/* <ReactStars
                count={5}
                value={avgReviewCount || 0}
                size={20}
                edit={false}
                activeColor="#ffd700"
                emptyIcon={<FaRegStar />}
                fullIcon={<FaStar />}
              /> */}

              {/* <RatingStars Review_Count={avgReviewCount} /> */}

              {/* <span className="text-richblack-400">
                {course?.ratingAndReviews?.length} Ratings
              </span> */}


            </div>
            <p className="text-xl text-richblack-5">₹ {course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Course_Card
