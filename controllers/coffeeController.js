const coffeeService = require('../services/coffeeService');

const renderHome = async (req, res, next) => {
    try {
        const menu = await coffeeService.getMenuData();
        res.render('index', { title: 'CaffeineExpress - Home', featuredItems: menu.slice(0, 2) });
    } catch (err) {
        next(err);
    }
};

const renderMenu = async (req, res, next) => {
    try {
        const menu = await coffeeService.getMenuData();
        res.render('menu', { title: 'Our Menu', menu });
    } catch (err) {
        next(err);
    }
};

const handleReviewSubmit = async (req, res, next) => {
    try {
        await coffeeService.addReview(req.body);
        res.redirect('/menu');
    } catch (err) {
        next(err);
    }
};

const renderOrderPage = async (req, res, next) => {
    try {
        const menu = await coffeeService.getMenuData();
        res.render('order', { title: 'Order Ahead', menu, receipt: null });
    } catch (err) {
        next(err);
    }
};

const handleOrderSubmit = async (req, res, next) => {
    try {
        const receipt = await coffeeService.createOrder(req.body);
        const menu = await coffeeService.getMenuData();
        res.render('order', { title: 'Order Confirmation', menu, receipt });
    } catch (err) {
        next(err);
    }
};

const renderDashboard = async (req, res, next) => {
    try {
        const pendingOrders = await coffeeService.getPendingOrders();
        res.render('dashboard', { title: 'Staff Dashboard', pendingOrders });
    } catch (err) {
        next(err);
    }
};

const handleStatusUpdate = async (req, res, next) => {
    try {
        await coffeeService.updateOrderStatus(req.params.id, req.body.status);
        res.redirect('/dashboard?role=employee');
    } catch (err) {
        next(err);
    }
};

module.exports = {
    renderHome,
    renderMenu,
    handleReviewSubmit,
    renderOrderPage,
    handleOrderSubmit,
    renderDashboard,
    handleStatusUpdate,
};
