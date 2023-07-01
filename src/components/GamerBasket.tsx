interface Props {
    gamerAmount: number
    gamer: string
}
const GamerBasket = ({gamerAmount, gamer}: Props) => {
    return <>
    
          {
  gamerAmount > 10 ? (
    <div className="applesInTheBasket">{ new Array(10)
      .fill(0)
      .map((_, id) => <div className={`tenApples__${id}`}>🍎</div>)}</div>
   
  ) : gamerAmount <= 10 && gamerAmount > 5 ? <div className="applesInTheBasket">{
    (
      new Array(5)
        .fill(0)
        .map((_, id) => <div className={`fiveApples__${id}`}>🍎</div>)
    )
  }</div> : gamerAmount <= 5 && gamerAmount > 0 ? <div className="applesInTheBasket">{(
    new Array(3)
      .fill(0)
      .map((_, id) => <div className={`threeApples__${id}`}>🍎</div>)
  )}</div> : null
}
            <img src="/img/basket.png" alt="basket" />
            <br /> <span style={{color: 'black'}}>Amount: {gamerAmount}</span>
            <br />
            <div style={{fontSize: '20px', fontWeight: '800', color: 'black'}}>{gamer}</div>

    </>;
}
 
export default GamerBasket;