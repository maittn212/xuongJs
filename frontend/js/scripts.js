/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

const getProducts = async (content)=>{
    try{
        const res = await fetch('http://localhost:3000/products')
        const products = await res.json()
        console.log(products);
        // content.innerHTML = 'Mai'
        // Duyệt mảng products
       products.forEach(product => {
        // Tạo div element
        const div = document.createElement('div');
        div.classList.add('col')
        div.classList.add('mb-5');
        div.innerHTML = `
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top" src="${product.image}" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">${product.name}</h5>
                                    <!-- Product price-->
                                    ${product.price}
                                </div>
                            </div>
                          
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="detail.html?id=${product.id}">Chi tiết</a></div>
                            </div>
                            
                        </div>
        
        ` 
        // Insert product vào content
        content.append(div)
       });

    }catch(error){

    }
}

const getProductsById = async (image, info, id) => {
    try {
        const res = await fetch(`http://localhost:3000/products/${id}`);
        const product = await res.json();

        image.innerHTML = `
            <img src="${product.image}" />
        `;
        info.innerHTML = `
            <h1>${product.name}</h1>
            <span>${product.price}</span>
            <p>${product.description}</p>

            <form onsubmit="submitCart(event, this)">
                Số lượng
                <input type="number" value="1" name="quantity" min="1" />
                <input type="hidden" name="productid" value="${product.id}" />
                <button type="submit" class="btn btn-danger">Thêm giỏ hàng</button>
            </form>
        `;
    } catch (error) {
        console.error("Error fetching product:", error);
    }
};

const TotalQuantityCart = () => {
    const badge = document.querySelector('#navbarSupportedContent .badge');
    const cart = localStorage.getItem('cart');
    
    if (cart) {
        const items = JSON.parse(cart);
        const total = items.reduce((value, item) => {
            return value + item.quantity;
        }, 0);
        badge.innerHTML = `${total}`;
    } else {
        badge.innerHTML = `0`;
    }
};

const addToCart = (id, quantity) => {
    quantity = parseInt(quantity, 10);
    const cart = localStorage.getItem('cart');
    
    if (cart) {
        const items = JSON.parse(cart);
        const existingItem = items.find(item => item.productId == id);
        
        if (existingItem) {
            existingItem.quantity += quantity; // Cộng thêm số lượng
        } else {
            items.push({ productId: id, quantity });
        }
        
        localStorage.setItem('cart', JSON.stringify(items));
    } else {
        const newItem = { productId: id, quantity };
        localStorage.setItem('cart', JSON.stringify([newItem]));
    }

    TotalQuantityCart();
};

const submitCart = (event, form) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định
    const productid = form.children.productid.value;
    const quantity = form.children.quantity.value;

    console.log("Adding to cart:", { productid, quantity }); // Kiểm tra ID và số lượng
    addToCart(productid, quantity);
};

// Khởi động hàm tổng số lượng giỏ hàng
TotalQuantityCart();



