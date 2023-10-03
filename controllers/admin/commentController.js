const Comment = require("./../../models/comment");

exports.deleteComment = async (req, res) => {
	var comment_id = req.body.comment_id;

	if (!comment_id) return res.json({ status: "MISSING_FIELD", message: "all fileds are required." });

	try {
		var data = await Comment.findOneAndRemove({ _id: comment_id });
	} catch (error) {
		return res.json({ status: "X", message: "something went wront while deleting comment.", error });
	}

	if (!data) return res.json({ status: "NOT_EXIST", message: "Comment does not exist." });
	res.json({ status: "OK", data });
	
};
