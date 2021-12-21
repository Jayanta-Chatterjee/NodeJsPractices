exports.get404=(req,res,next)=>{
    // res.status(404).sendFile(path.join(__dirname,'views','notFound.html'));
    res.status(404).render('notFound',{docTitle:'Not Found!',path:''});
}