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
                    fontWeight:'bold'
                }}>
                    Меню
                </button>
                </Link>
            </div>
            <div style={{
                padding:'40px',
                display:'flex',
                flexDirection:'column',
                alignItems:'center'}}>
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
                            
                            </div>
                        ))}
                    </div>
                ) }  
            </div>
        </div>
    )
}