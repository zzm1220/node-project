const loginRouter = (req, res) => {
    // method
    const method = req.method;
    if (method==="POST" || req.path === "/api/user/login") {
        return {
            msg: 'login'
        }
    }
};

module.exports = loginRouter;