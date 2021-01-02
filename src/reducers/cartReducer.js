const initialState = {
    carrinho: [],
    total: 0,
    taxa_entrega: 0,
    whatsapp: ''
};

const operations = {
    add: "add",
    remove: "remove",
};
function getProductIndexFromCart(product_id, cart) {
    return cart.findIndex((p) => p.id == product_id);
}

function addQtdToIndex(cart, index, qtd = 1) {
    const car = [...cart];

    car[index].qtd += qtd;

    return car;
}

function changeTotalPrice(price, total, operation) {
    switch (operation) {
        case "add": {
            return total + Number.parseFloat(price);
        }
        case "remove": {
            return total - Number.parseFloat(price);
        }
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "CLEAR_CART":
            return initialState;

        case "TAXA_ENTREGA":
            return { ...state, taxa_entrega: action.payload }

        case "WHATSAPP":
            return { ...state, whatsapp: action.payload }

        case "ADD_TO_CART": {
            const product_index = getProductIndexFromCart(
                action.payload.carrinho.id,
                state.carrinho
            );

            const total = changeTotalPrice(
                action.payload.carrinho.preco_vigente,
                state.total,
                operations.add
            );

            if (product_index >= 0) {
                const cart = addQtdToIndex(state.carrinho, product_index, 1);
                return { ...state, carrinho: cart, total };
            }
            return {
                ...state,
                carrinho: [
                    ...state.carrinho,
                    { ...action.payload.carrinho, qtd: 1 },
                ],
                total,
            };
        }

        case "DEL_FROM_CART": {
            const product_index = getProductIndexFromCart(
                action.payload.carrinho.id,
                state.carrinho
            );

            const total = changeTotalPrice(
                action.payload.carrinho.preco_vigente,
                state.total,
                operations.remove
            );

            if (state.carrinho[product_index].qtd == 1) {
                return {
                    ...state,
                    carrinho: state.carrinho.filter(
                        (item, item_key) => item_key != product_index
                    ),
                    total,
                };
            }
            return {
                ...state,
                carrinho: state.carrinho.map((item, item_key) => ({
                    ...item,
                    qtd: item_key == product_index ? item.qtd - 1 : item.qtd,
                })),
                total,
            };
        }
    }

    return state;
};
