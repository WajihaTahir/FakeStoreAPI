import React, {useState, useEffect} from 'react'
import "../Search.css"

const Search = ({results, setProducts}) => {
    const[loading, setLoading] = useState(false);
    const posts = results;
    console.log("resultssearch", results);

   
  return (
    <div className='search'>
        <input className="search-box" type = "text"
        placeholder='search for a product'
        onChange={(e)=> {
        const filtered = posts.filter((value) => {
                    if(e.target.value===""){
                        return value
                    }
                    else if(value.title.toLowerCase().includes(e.target.value.toLocaleLowerCase())){
                        return value;
                    }
                  })
                  setProducts(filtered);
        }}
        />
        {loading && (<h4>Loading ....</h4>)
        }
        </div>
  )
}

export default Search