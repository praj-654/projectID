import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Card from '../components/Card'

export default function Home() {

  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://127.0.0.1:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    //console.log(response[0],response[1]);
  }
  useEffect(() => {
    loadData()
  }, [])



  return (
    <div>
      <div><Navbar /></div>

      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>


          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" background-color="dark" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/300×300/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/300×300/?colddrinks" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/300×300/?chicken-piece" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* <div className='container'>
  {foodCat.length > 0 ? (
    // Iterate through food categories
    for (let i = 0; i < foodCat.length; i++) {
      const category = foodCat[i];
      (
        <div className="row mb-3" key={category._id}>
          <div className="fs-3 m-3">{category.CategoryName}</div>
          <hr />

          {foodItems.length > 0 ? (
            // Iterate through food items
            for (let j = 0; j < foodItems.length; j++) {
              const filterItem = foodItems[j];
              if (
                filterItem.CategoryName === category.CategoryName &&
                filterItem.name.toLowerCase().includes(search.toLowerCase())
              ) {
                (
                  <div key={filterItem._id} className="col-12 col-md-6 col-lg-3">
                    <Card foodItem={filterItem} options={filterItem.options[0]}></Card>
                  </div>
                )
              }
            }
          ) : (
            <div>No data</div>
          );}
        </div>
      );
    }
  ); : (
    <div>No food categories found</div>
  );}
</div> */}
<div className='continer'>
  {
    foodCat!=='[]'
    ? foodCat.map((data)=>{
      return(
        <div className='row mb-3'>
        <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
        <hr/>
        {foodItem !== '[]' ? foodItem.filter((item)=>item.CategoryName===data.CategoryName &&(item.name.toLowerCase().includes(search.toLowerCase()))).map(filterItem=>{
          return(
            // // <div key={filterItem._id } className='col-12 col-md-6 col-lg-3'>
            // //   <Card foodItem={foodItem.options[0]}
            // //   option={filterItem.option}
            // // ></Card>
            //   </div>
            ""
          )
        }):<div>no</div>}
        </div>
      )
    }):<div>"""""""</div>
  }
<Card/>
</div>



      <div><Footer /></div>
    </div>
  )
}
