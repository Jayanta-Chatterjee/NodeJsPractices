exports.get404 = (req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname,'views','notFound.html'));

  res
    .status(404)
    .render("notFound", {
      docTitle: "Not Found!",
      path: "",
      isAuthenticated: req.session.isLoggedIn,
    });
};

exports.get500=(req,res,next)=>{
  res.status(500).render("500",{
    docTitle:"Error",
    path:"",
    isAuthenticated: req.session.isLoggedIn,
  });
}