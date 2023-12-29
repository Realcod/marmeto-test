
document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from the JSON file
    fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched data:", data);

            
            const categoriesData = Array.isArray(data.categories) ? data.categories : [];
            console.log("Categories data:", categoriesData);

            // Function to display products based on the selected category
            function displayProducts(category) {
                const productsContainer = document.querySelector(".collection");

                // Clear existing products
                productsContainer.innerHTML = "";

                // Find the selected category
                const selectedCategory = categoriesData.find(cat => cat.category_name === category);

                if (selectedCategory) {
                    // Display each product in the container
                    selectedCategory.category_products.forEach(product => {
                        const productElement = document.createElement("div");
                        productElement.classList.add("product");

                        // Calculate percentage difference
                        const price = parseFloat(product.price);
                        const compareAtPrice = parseFloat(product.compare_at_price);
                        const percentageDiff = ((compareAtPrice - price) / compareAtPrice) * 100;

                        productElement.innerHTML = `
                            <a class="product__image" href="#">
                                <img src="${product.image}" width="88px" height="110px">
                            </a>
                            <div class="product__details">
                                <div class="product__name">
                                    <p><a href="#">${product.title}</a> - ${product.vendor}</p>
                                </div>
                                <div class="product__price">
                                    <p class="price-details">
                                        Rs${price.toFixed(2)}
                                        <span class="old-price">Rs${compareAtPrice.toFixed(2)}</span>
                                        ${percentageDiff.toFixed(0)}% off
                                    </p>
                                </div>
                                <div class="product__cart-button">
                                    <button style="background-color: black; color: white;">Add to Cart</button>
                                </div>
                            </div>
                        `;

                        productsContainer.appendChild(productElement);
                    });
                }
            }

            // Event listener for category clicks
            const menButton = document.getElementById("Gen1");
            const womenButton = document.getElementById("Gen2");
            const kidsButton = document.getElementById("Gen3");
            menButton.addEventListener("click", function () {
                console.log("Men clicked");
                displayProducts("Men");

                
                menButton.classList.add("active");
                womenButton.classList.remove("active");
                kidsButton.classList.remove("active")
            });

            womenButton.addEventListener("click", function () {
                console.log("Women clicked");
                displayProducts("Women");

                
                menButton.classList.remove("active");
                womenButton.classList.add("active");
                kidsButton.classList.remove("active")
            });

            kidsButton.addEventListener("click", function () {
                console.log("Kids clicked");
                displayProducts("Kids");

                menButton.classList.remove("active");
                womenButton.classList.remove("active");
                kidsButton.classList.add("active");
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});
