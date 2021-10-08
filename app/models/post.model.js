module.exports = mongoose => {
    let postSchema = mongoose.Schema(
        {
            text: {
                type: String
            },
            images: [],
            reactions: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'reactions'
                }

            ]

        },
        { timestamps: true }
    );

    postSchema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        delete object._id;
        return object;
    });

    const Post = mongoose.model('posts', postSchema);
    return Post;
}