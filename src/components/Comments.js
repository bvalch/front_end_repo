import "../css/comments.css"

const Comments=({comments})=>{
    if(comments ===undefined)return < div> Loading</div>

    console.log(comments)

    const commentNodes=comments.map((comment,i)=>{
        return(
        <div key={i} className="single-commeent-container">
            <div className="comment-by-time"><div>By: {comment.author_name}</div>  <div>{comment.time}</div></div>
            <div className="comment">{comment.comment}</div>

        </div>)
    })


return(

<div className="comments-container">
    {commentNodes}

    
</div>

)
};
export default Comments;