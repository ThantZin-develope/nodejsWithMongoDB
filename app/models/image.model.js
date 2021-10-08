module.exports = mongoose => {
    let imageSchema = mongoose.Schema(
        {
            url: {
                type: String,
                required: true
            }
        },
        { timestamps: true }
    );

    imageSchema.method('toJSON', function () {
        var { __v, _id, ...object } = this.toObject();
        object.id = _id;
        delete object._id;
        return object;
    });

    let Image = mongoose.model('images', imageSchema);
    return Image;
}