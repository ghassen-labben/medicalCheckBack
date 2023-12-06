module.exports.setFlash=function(req,res,next){
    res.locals.flash={
        'succes':req.flash('succes'),
        'error':req.flash('error')
    }
    next()
}