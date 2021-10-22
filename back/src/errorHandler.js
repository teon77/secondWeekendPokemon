module.exports.errorHandler = (err, req, res, next) => {
    if(err) {
        res.send(err);
    }
    next();
}