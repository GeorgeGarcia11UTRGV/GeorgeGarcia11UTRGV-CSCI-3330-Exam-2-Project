const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);

    next();
};


const requireEmployee = (req, res, next) => {

    if (req.query.role === 'employee') {
        return next(); 
    }
    
    return res.status(403).send('Access Denied: Employees Only');
};

const errorHandler = (err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).send('Something went wrong! Please try again.');
};

module.exports = {
    requestLogger,
    requireEmployee,
    errorHandler,

};