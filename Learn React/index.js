import React from 'react';
import ReactDOM from 'react-dom';

function Menu(){
    function List(props){
        return (
            <div>
                <p>Product: {props.name}</p>
                <p>Price: {props.price}</p>
            </div>
        )
    }
    
    const Product= [
        {
            id: 0,
            product: 'Pen',
            value: '$1'
        },
        {
            id: 1,
            product: 'Book',
            value: '$2'
        }
    ]
    
    const Products = Product.map(
        function ProductList(){
            return(
                <List
                    key={ProductList.id}
                    name={ProductList.product}
                    price={ProductList.value}
                />
            )
        }
    )
    
    return (
       <div>
            {Products}
        </div>
    )
}
ReactDOM.render(
    <Menu/>,
    document.getElementById("app")
)