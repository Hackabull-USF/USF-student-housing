const Container = ({children}) => {
    return (
        
        <div style={{ margin: 50, marginLeft: 100, marginRight: 100, padding: 20, border: '2px solid gray', borderRadius: '10px'}}>
            <h3 id='selectCardsTitle'>Compare Your Plans by SELECT!</h3>
            {children}
        </div>
    )
}

export default Container;