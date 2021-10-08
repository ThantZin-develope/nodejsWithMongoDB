module.exports = mongoose => {
    let reactSchema = mongoose.Schema(
        {
            type: {
                type: Number,
                required: true,
            }
        },
        { timestamps: true }
    );

    reactSchema.method('toJSON', function () {
        var { __v, _id, ...object } = this.toObject();
        object.id = _id;
        delete object._id;
        return object;
    });

    let Reaction = mongoose.model('reactions', reactSchema);
    return Reaction;
}