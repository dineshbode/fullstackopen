const Filter = (props) => {
    return(
        <div>
            <p>Filter shown with <input value={props.search} onChange={props.handleSearchChange} /></p>
        </div>
    )
}
export default Filter;