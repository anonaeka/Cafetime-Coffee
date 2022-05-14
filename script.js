const navbarBurger = document.querySelector('.navbar-burger');
const navbarMenu = document.querySelector('.navbar-menu');
const filterButtons = document.querySelectorAll('.filter-button');
const productColumns = document.querySelectorAll('.product-column');

function toggleMenu() {
    navbarBurger.classList.toggle('is-active');
    navbarMenu.classList.toggle('is-active');
}

function filterAnimation(selectedCategory, action, deley) {
    return new Promise((resolve) => {
        setTimeout(() => {
            productColumns.forEach(column => {
                if (action === 'fade-in') {
                    column.classList.add('fade-out');
                }
                else if (action === 'display') {
                    const productCategory = column.dataset.category;
                    if (productCategory === selectedCategory || selectedCategory === 'all') {
                        column.classList.remove('is-hidden');
                    }
        
                    else {
                        column.classList.add('is-hidden');
                    }
                }
                else if (action === 'fade-out') {
                    column.classList.remove('fade-out');
                }
            });
            resolve();
        }, deley);
    });
}

async function filterProducts(event) {
    const selectedButton = event.target;
    filterButtons.forEach((button) => {
        button.classList.remove('is-dark');
    });
    selectedButton.classList.add('is-dark');

    const selectedCategory = selectedButton.dataset.category;
    console.log(selectedCategory);

    await filterAnimation(selectedCategory, 'fade-in', 0);
    await filterAnimation(selectedCategory, 'display', 500);
    await filterAnimation(selectedCategory, 'fade-out', 200);
}

filterButtons.forEach((button) => {
    button.addEventListener('click', filterProducts);
})

navbarBurger.addEventListener('click', toggleMenu);
