function Image()
{

    return(
     
        // <div className="mt-3 ms-4 me-4 mb-4"> 
        //     <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Books/052021/bookshomepage/Online-book-store_PC_header._CB667971553_SY250_.jpg"
        //      width="100%" />
        // </div>
        <div className="mt-3 mb-3">
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner"> 
            <div className="carousel-item active">
              <img src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonBooksMarketing/LandingPage/AB/Landing-Evergreen-Hero-Desktop-Books.png"
               className="d-block w-100 " alt="..." style={{height:"500px"}}/>
            </div>
            <div className="carousel-item">
              <img  src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Books/052021/bookshomepage/Online-book-store_PC_header._CB667971553_SY250_.jpg" 
              className="d-block w-100" alt="..." />
            </div>
            </div>

        </div>
       
        </div>
    )
}
export default Image;