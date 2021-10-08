module.exports = mongoose => {
    let commentSchema = mongoose.Schema(
        {
            text: {
                type: String,
                requried: true,

            },
            post: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'posts'
            }
        },
        {
            timestamps: true
        }
    );

    commentSchema.method('toJSON', function () {
        var { __v, _id, ...object } = this.toObject();
        object.id = _id;
        delete object._id;
        return object;
    });

    let Comment = mongoose.model('comments', commentSchema);
    return Comment;
}