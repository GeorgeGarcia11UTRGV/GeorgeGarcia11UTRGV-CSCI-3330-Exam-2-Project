class User {
    constructor(userId, name, email, role) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
    }
}

class MenuItem {
    constructor(itemId, name, description, price, category) {
        this.itemId = itemId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category; 
    }
}

class Order {
    constructor(orderId, userId, timestamp, pickupTime, status = 'pending') {
        this.orderId = orderId;
        this.userId = userId;
        this.timestamp = timestamp;
        this.pickupTime = pickupTime;
        this.status = status;
    }
}

class OrderItem {
    constructor(orderItemId, orderId, itemId, quantity, customizedNotes = '') {
        this.orderItemId = orderItemId;
        this.orderId = orderId;
        this.itemId = itemId;
        this.quantity = quantity;
        this.customizedNotes = customizedNotes;
    }
}

class Review {
    constructor(reviewId, itemId, customerName, rating, comment) {
        this.reviewId = reviewId;
        this.itemId = itemId;
        this.customerName = customerName;
        this.rating = rating; 
        this.comment = comment;
    }
}

const users = [
    new User(1, 'Alex Rivera', 'alex@caffeineexpress.com', 'employee'),
    new User(2, 'Sam Taylor', 'sam@email.com', 'customer')
];

const menuItems = [
    new MenuItem(1, 'Caramel Macchiato', 'Espresso with steamed milk and vanilla caramel drizzle', 4.75, 'beverage'),
    new MenuItem(2, 'Cold Brew', 'Slow-steeped smooth iced coffee', 4.25, 'beverage'),
    new MenuItem(3, 'Butter Croissant', 'Flaky, golden-baked French pastry', 3.50, 'bakery'),
    new MenuItem(4, 'Blueberry Muffin', 'Freshly baked muffin loaded with blueberries', 3.25, 'bakery')
];

const orders = [];
const orderItems = [];
const reviews = [
    new Review(1, 1, 'Sam Taylor', 5, 'Best caramel macchiato in town!')
];

const getMenuData = async () => {
    return menuItems.map(item => {
        const itemReviews = reviews.filter(r => r.itemId === item.itemId);
        return { ...item, reviews: itemReviews };
    });
};

const getAllUsers = async () => {
    return users;
};

const createOrder = async ({ customerName, customerEmail, pickupTime, itemId, quantity, customizedNotes }) => {
    let user = users.find(u => u.email === customerEmail);
    
    if (!user) {
        user = new User(users.length + 1, customerName, customerEmail, 'customer');
        users.push(user);
    } else {
        user.name = customerName;
    }

    const newOrder = new Order(
        orders.length + 1,
        user.userId,
        new Date().toLocaleTimeString(),
        pickupTime,
        'pending'
    );
    orders.push(newOrder);

    const menuItem = menuItems.find(m => m.itemId === Number(itemId));
    if (!menuItem) {
        throw new Error('Selected menu item not found.');
    }

    const qty = Number(quantity) || 1;
    const newOrderItem = new OrderItem(
        orderItems.length + 1,
        newOrder.orderId,
        menuItem.itemId,
        qty,
        customizedNotes
    );
    orderItems.push(newOrderItem);

    const subtotal = menuItem.price * qty;
    const tax = subtotal * 0.0825; 
    const total = subtotal + tax;

    return {
        order: newOrder,
        user,
        menuItem,
        orderItem: newOrderItem,
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
    };
};

const getPendingOrders = async () => {
    return orders
        .filter(o => o.status === 'pending') 
        .map(order => {
            const customer = users.find(u => u.userId === order.userId);
            const items = orderItems
                .filter(oi => oi.orderId === order.orderId)
                .map(oi => {
                    const product = menuItems.find(m => m.itemId === oi.itemId);
                    return { ...oi, itemName: product ? product.name : 'Unknown' };
                });
            return { ...order, customerName: customer ? customer.name : 'Guest', items };
        });
};

const updateOrderStatus = async (orderId, newStatus) => {
    const order = orders.find(o => o.orderId === Number(orderId));
    if (!order) {
        throw new Error('Order not found.');
    }
    order.status = newStatus;
    return order;
};

const addReview = async ({ itemId, customerName, rating, comment }) => {
    const newReview = new Review(
        reviews.length + 1,
        Number(itemId),
        customerName,
        Number(rating),
        comment
    );
    reviews.push(newReview);
    return newReview;
};

module.exports = {
    getMenuData,
    getAllUsers,
    createOrder,
    getPendingOrders,
    updateOrderStatus,
    addReview
};
