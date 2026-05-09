import { Product } from "../components/ComponentCard";
import { UseCardStore } from "../store/useStoreCard";
import cardIcon from '../assets/free-icon-shopping-cart-of-checkered-design-34627.png'
import iconRegistr from '../assets/icons8-добавить-пользователя-50.png'
const MENU = [
    {id: '1', title:'Рол филодельфия', price: 450},
    {id: '2', title:'Пица пеперони', price: 550},
    {id: '3', title:'Суп том ям', price: 550},


]
export function Home () {
    const cartItem = UseCardStore((state) => state.items);
    const totalQuantity = cartItem.reduce((sum, item) => sum + item.quantity, 0);
    return(
    <div style={{width:'100vw', height:'100vh', display:'flex'}}>
        <div style={{width:'100px', height:'100vh', background:'#ff5722'}}>
            <button style={{width:'50px', height:'50px', borderRadius:'13px', border:'0', margin:'20px' }} onClick={() => alert('registr')}>
                <img src ={iconRegistr} alt="registr"  width={30} height={30} style={{margin:'13px'}}/>
            </button>
            <button style={{margin:'20px', border:'0px', borderRadius:'13px', width:'50px', height:'50px'}}>
                <img src ={cardIcon} alt="Описание картинки" width= {30} height={30} style={{margin:'3px'}} /> <strong style={{display:'flex', justifyContent:'center',width:'20px', height:'20px', background:'red', borderRadius:'13px', alignItems:'center', color:'white', fontSize:'12px'}}>{totalQuantity}</strong>
            </button> 
        </div>
        <div style={{ padding: '20px', display:'flex', alignItems:'center', flexDirection:'column', width:'100%', height:'100%'}}>
      <h1>Меню "Вкуси Суши"</h1>
      
      <div style={{ 
        margin: '20px', 
        alignItems: 'stretch',
        padding: '15px', 
        backgroundColor: '#e0f7fa', 
        borderRadius: '8px' 
      }}>
        Товаров в корзине: <strong>{totalQuantity}</strong>
      </div>

      {/* Контейнер для карточек */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                 {MENU.map((product) => (
                <Product
                key={product.id} 
                id={product.id} 
                title={product.title} 
                price={product.price} 
                />
                ))}
            </div>
        </div>

    </div>
    )
}