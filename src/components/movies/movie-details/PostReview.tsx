// import Button from "@/components/Button";

const PostReview = () => {
//     const handleClick = () => {
//   console.log("Review submitted");
// };


  return (
    <div className="bg-kino-darkgrey p-4 rounded-lg my-4 mx-2 max-w-xs">
      <h2 className="mb-2 text-center">Submit a review</h2>
      <input
        type="text"
        placeholder="Your review"
        className="border border-kino-red rounded-lg p-2 mb-2 w-full h-16"
      />
      <div  className= "border border-kino-red rounded-lg p-2 mb-2">
      <label htmlFor="rating" className="text-sm text-kino-grey"></label>
        <select className="bg-kino-darkgrey text-kino-white">
        <option value="">Choose rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>      
     </select> 
     </div>     
      <input
        type="text"
        placeholder="Name"
        className="border border-kino-red rounded-lg p-2 mb-2"
      />
      {/* <Button 
        type="submit"
        className="bg-kino-red hover:bg-kino-darkred text-white font-bold py-2 px-4 rounded-lg w-full"
        onClick={handleClick}>
        Submit Review
        </Button>     */}
    </div>
  );
};

export default PostReview;
