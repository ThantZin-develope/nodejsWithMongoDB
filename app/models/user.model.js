module.exports = mongoose => {
    let userSchema = mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
            },
            age: {
                type: String
            },
            isMarried: {
                type: Boolean
            }

        },
        {
            timestamps: true
        }
    );

    userSchema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        delete object._id;
        return object;
    });
    const User = mongoose.model(
        'users',
        userSchema

    );

    return User;
}