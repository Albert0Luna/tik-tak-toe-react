export const Square = ({children, isSelected, updateBoard, index}) =>{
    const clase = `square ${isSelected ? 'is-selected' : ''}`
  
    const handleClick = () => {
      updateBoard(index)
    }
  
    return <div onClick={handleClick} className={clase}>{children}</div>
  }
