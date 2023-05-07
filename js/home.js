const renderProducts = async () => {
  const data = await getProducts()
const container = document.getElementById("prodDisplay");

    data.forEach(product => {
    const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML += `<div class="card-image">
                          <img src=${product.img}>
                          <span class="card-title">${product.name}</span>
                          <a class="btn-floating halfway-fab wabes-effect waves-light red"><i id=${product.id} class="material-icons add">add_shopping_cart</i></a>
                        </div>
                        <div class="card-content">
                            <p>${product.desc}</p>
                            <p>${product.price}</p>
                        </div>
                       `
      container.appendChild(div);
    });
  }

