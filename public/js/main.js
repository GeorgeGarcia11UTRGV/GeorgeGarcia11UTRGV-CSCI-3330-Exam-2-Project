document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.querySelector('form[action="/order"]');
    
    if (orderForm) {
        orderForm.addEventListener('submit', (event) => {
            const quantityInput = document.getElementById('quantity');
            
            if (parseInt(quantityInput.value) > 10) {
                alert('For bulk pre-orders larger than 10 items, please call CaffeineExpress directly!');
                event.preventDefault();
            }
        });
    }
});
