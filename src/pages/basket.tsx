import { UseCardStore } from "../store/useStoreCard";
import { Link } from "react-router-dom";

export function CartBasket(){
    const cartItem = UseCardStore((state) => state.items);
    const delit = UseCardStore((state) => state.removeItem)
    const totalPrice = cartItem.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return(
        <div style={{display:'flex', width:'100vw', height:'100vh'}}>
            <div style={{width:'100px', height:'100vh',
                background:'#ff5722',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                paddingTop:'20px',
                 }}>
                <Link to="/" style={{textDecoration:'none'}}>
                <button style={{
                    border:'none',
                    borderRadius:'13px',
                    padding:"10px 15px",
                    backgroundColor:'white',
                    color:'#ff5722',
                    fontWeight:'bold',
                    cursor:'pointer'
                }}>
                    Меню
                </button>
                </Link>
            </div>
            <div style={{
                padding:'40px',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                width:"100%"}}>
                <h1> Корзина</h1>
                {cartItem.length === 0 ? (<p style={{marginTop:'20px', fontSize:'18px'}}>Ваша корзина пуста</p>) : (
                    <div style={{width:'100%', maxWidth:'600px', marginTop:'20px'}}>
                        {cartItem.map((item) => (
                            <div key = {item.id} style={{
                                display:'flex',
                                justifyContent:'space-between',
                                alignItems:'center',
                                padding:'15px',
                                backgroundColor:'white',
                                borderRadius:'8px',
                                
                            }}>
                            <div>
                                <h3 style={{ margin: 0 }}>{item.title}</h3>
                                <p style={{ margin: '5px 0 0', color: '#666' }}>
                                {item.price} р. x <strong>{item.quantity} шт.</strong>
                                </p>
                            </div>
                            <button onClick={() => delit(item.id)} style={{
                                backgroundColor:'#ff5252',
                                color:'white',
                                border:'none',
                                padding:'8px 12px',
                                borderRadius:'4px',
                                cursor:'pointer',
                                margin:'10px'
                            }}>
                                Удалить
                            </button>
                            </div>
                        ))}
                        <div style={{
                            marginTop:'20px',
                            padding:'20px',
                            backgroundColor:'#e0f7fa',
                            borderRadius:'8px',
                            display:'flex',
                            justifyContent:'space-between',
                            alignItems:'center'
                        }}>
                            <h2>Итого</h2>
                            <h2 style={{color:'#ff5222', margin:'0'}}>{totalPrice}p.</h2>
                        </div>
                        <button onClick={() => alert('Заказ на сумму ${totalPrice} р. оформлен')} style={{
                            width:'100%',
                            marginTop:'20px',
                            padding:'15px',
                            backgroundColor:'#4caf50',
                            color:'white',
                            borderRadius:'8px',
                            cursor:'pointer',
                            fontSize:'18px',
                            border:'none',

                        }}>
                            Оформить заказ
                        </button>
                    </div>
                ) }  
            </div>
        </div>
    )
}