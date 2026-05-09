import { UseCardStore } from "../store/useStoreCard";


interface ProductCard {
    id: string,
    title: string;
    price: number
}


export const Product =({id, title, price}: ProductCard)=>{
    const addItem =  UseCardStore((state) =>state.addItems)
    
    const handleClick = () =>{
        addItem({id, title, price})
        alert(`Блюдо "${title}" добавлено в корзину`)
    };
    return(
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '15px', 
      borderRadius: '8px', 
      width: '200px',
      backgroundColor: 'white',
      display:"flex",
      flexDirection:"column",
    }}>
      <h3>{title}</h3>
      <p style={{ fontWeight: 'bold', color: '#ff5722' }}>{price} р.</p>
      
      <button 
        onClick={handleClick} 
        style={{ 
          marginTop: 'auto', 
          padding: '8px 12px', 
          cursor: 'pointer',
          backgroundColor: '#ff5722',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          width: '100%'
        }}
      >
        В корзину
      </button>
    </div>
    )
}