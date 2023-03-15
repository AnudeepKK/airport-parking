import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import AirportSuggestions from "../components/AirportSuggestions";
const SearchForm = () =>{
        const today=moment().format('YYYY-MM-DD').toString();
        const tomrrow = moment().add(1,'days').format('YYYY-MM-DD').toString();
        const [departureAirport,setDepartureAirport] = useState("");
        const [checkin,setCheckin] = useState(today);
        const [checkout,setCheckout] = useState(tomrrow);
        const [airports, setAirports] = useState([]);
        // const navigate = useNavigate();
        const [filteredAirports, setFilteredAirports] = useState('');
        const [errors,seterrors] =useState( {
            departureAirport:false,
            checkin:false,
            checkout:false
        })
    
        const DepartureAirportHandler = (e) => {
            //event.target.value
            const {value} = e.target;    
                setDepartureAirport(value);
                if(e.target){
                    seterrors({...errors,departureAirport:false});
                }else{
                    seterrors({...errors,departureAirport:true});
                }
                const filteredAirportsData = airports.filter((airport) => 
                  airport.name.toLowerCase().includes(e.target.value.toLowerCase()));
                  setFilteredAirports(filteredAirportsData?? [])
                  console.log(filteredAirports)
            }
        const checkinHandler = (e) => {
            //event.target.value
            const {value} = e.target;
            setCheckin(value);
            if(e.target){
                seterrors({...errors,checkin:false})
            }
    
        }
        const checkoutHandler = (e) => {
            //event.target.value
            const {value} = e.target;
            setCheckout(value);
            if(moment(checkin) > moment(checkout))
            {
                seterrors((err) => ({ ...err, checkout: true }))
    
            }
            if (e.target.value) {
                seterrors((err) => ({ ...err, checkout: false }))
                } 
            else {
                seterrors((err) => ({ ...err, checkout: true }))
                }
    
        }
    
        const submitHandler = (e) => {
            console.log(departureAirport)
            console.log(checkin)
            console.log(checkout)
            //event.target.value
            e.preventDefault();
            if(moment(checkin) > moment(checkout))
        {
            alert("Check In Date can't be greater than Check Out Date")
            seterrors((err) => ({ ...err, checkout: true }))

        }
       else if(departureAirport && checkin && checkout)
        {
            alert("Form Submitted");
            // navigate(`/results?departureAirport=${departureAirport}&checkin=${checkin}&checkout=${checkout}`);
            window.location.href = `/results?departureAirport=${departureAirport}&checkin=${checkin}&checkout=${checkout}`
        }
        else{
            seterrors({
                departureAirport:!departureAirport,
                checkin:!checkin,
                checkout:!checkout
            })
            alert("There is a error")
        }
            
        }
        
        const [loading,setloading] = useState(false);

        
        
          useEffect(() => {
            getAirport();
          }, []);
        
          const selectAirport = (value) => {
            setDepartureAirport(value);
            setFilteredAirports([]);
          };
        const getAirport = async () => {
            try {
              const { data, status } = await axios.get(
                "http://43.205.1.85:9009/v1/airports"
              );
              if (status === 200 && data) {
                setAirports(data?.results ?? []);
              } else {
                setAirports([]);
              }
              setloading(false);
            } catch (error) {
              setloading(true);
              console.log(error.message);
            }
          };
        
    return(
        <div>
            <form action="/results.html" method="post" autoComplete="off" noValidate="">
                                        <div className="options row m-0"><label className="col-12 col-xl-3 p-0 mr-xl-3 mb-2">
                                                <div className="heading mb-1">Departure Airport</div>
                                                <div className="placeholder placeholder-airport">
                                                    <input type="text" onChange={DepartureAirportHandler} 
                                                    value={departureAirport}  
                                                    placeholder="Departure Airport" 
                                                    className="placeholder placeholder-airport" />
                                                    
                                                </div> <i
                                                    className="fas fa-map-marker-alt input-icon"></i>
                                                    {loading ?<h1>loading...</h1>:null}
                            {(errors && errors.departureAirport)? <h4 style={{color:"white",backgroundColor:"Highlight"}}>Invalid Departure Airport</h4>:null}
                            <AirportSuggestions airports={filteredAirports} selectAirport={selectAirport} />
                                                    
                                            </label>
                                            <div className="col p-0 row m-0 mb-2 dates"><label
                                                    className="col-sm-6 p-0 pr-sm-3 date_input">
                                                    <div className="heading mb-1">Parking Check-In</div>
                                                    <div className="placeholder">
                                                        <input name="checkin" 
                                                        type="date"
                                                         onChange={checkinHandler} 
                                                         placeholder="Parking Check-In"
                                                         value={checkin}
                                                          className="placeholder placeholder-airport"
                                                           style={{width:'100%'}}/>
                                                        {(errors.checkin?<div><br/><div  style={{border:1,backgroundColor:"#da70d6"}}><h4><em>Invalid check-in date</em></h4></div></div>:null)}
                                                    </div> 
                                                </label> <label className="col-sm-6 p-0 pl-sm-0 date_input">
                                                    <div className="heading mb-1">Parking Check-Out</div>
                                                        <input name="Check-Out"
                                                         type="date"
                                                          onChange={checkoutHandler} 
                                                          placeholder="Parking Check-Out" 
                                                          value={checkout}
                                                          className="placeholder placeholder-airport" 
                                                          style={{width:"100%"}}/>
                                                        {(errors.checkout?<div><br/><div  style={{border:1,backgroundColor:"#da70d6"}}><h4><em>Invalid check-out date</em></h4></div></div>:null)}
                                                </label></div>
                                            <div className="col-12 col-xl-2 p-0 pl-xl-3 my-3 my-xl-0">
                                                <div className="d-none d-xl-block heading mb-1 invisible">Submit</div>
                                                <button type="submit" onClick={submitHandler} className="btn btn-secondary btn-big btn-block p-2"><span>SEARCH</span></button>
                                            </div>
                                        </div>
                                    </form>
        </div>
    );
}


function HomePage() {
    
    return (
      <div className="App">
            <div id="app" className="generic">
          <div>
              {/* <app-header>
                  <Header/>
              </app-header> */}
              <div className="content">
                  <us-page-home inline-template>
                      <section id="home_page">
                          <div className="years-of-service">
                              <div className="container">
                                  For 20 years, we’ve helped travelers on their way. With free cancellations & a customer
                                  service team in the US, we are committed to serving you.
                              </div>
                          </div>
                          <section id="hero"
                              style={{ 
                                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/generic_landing.jpg)`,
                                minHeight: '500px'
                              }}>
                              <div className="hero-backdrop"></div>
                              <div className="container position-relative">
                                  <div className="hero-heading mb-4">
                                      <h1>SAVE BIG ON AIRPORT PARKING</h1>
                                      <h2>We have the best deals for airport parking lots!</h2>
                                  </div>
                                  <div className="searchbox landing">
                                      <div className="row tabs">
                                          <div className="tab">
                                              <div className="heading">Most Convenient</div>
                                              <div className="button">
                                                  <div className="icon"><i className="fas fa-car"></i></div>
                                                  Airport Parking Only
                                              </div>
                                          </div>
                                          <div className="tab">
                                              <div className="heading">Best Value</div>
                                              <div className="button">
                                                  <div className="icon"><i className="fas fa-bed"></i> + <i
                                                          className="fas fa-car"></i></div>
                                                  Hotel &amp; Parking Package
                                              </div>
                                          </div> 
                                      </div>
                                      <SearchForm/>
                                  </div>
                              </div>
                          </section>
                          <section id="benefits">
                              <div className="container">
                                  <h5>What Can You Save with AirportParkingReservations.com?</h5>
  
                                  <ul className="row">
                                      <li className="col-12 col-lg-4 p-3">
                                          <img src={require("./assets/check.png")} alt="Tick" width="50" height="50" />
                                          <div>
                                              <h6>Save Money</h6>
                                              <p>Save up to 70% off on our site compared to the cost of on-airport
                                                  parking.</p>
                                          </div>
                                      </li>
                                      <li className="col-12 col-lg-4 p-3">
                                          <img src={require("./assets/check.png")} alt="Tick" width="50" height="50" />
                                          <div>
                                              <h6>Save Time</h6>
                                              <p>
                                                  It's easy to compare parking at all major airports.<br />
                                                  Booking a reservation is quick & simple!
                                              </p>
                                          </div>
                                      </li>
                                      <li className="col-12 col-lg-4 p-3">
                                          <img src={require("./assets/check.png")} alt="Tick" width="50" height="50" />
                                          <div>
                                              <h6>Save Stress</h6>
                                              <p>
                                                  Guarantee your parking spot by booking in advance. Can't make it?
                                                  Cancellations are free.
                                              </p>
                                          </div>
                                      </li>
                                  </ul>
                              </div>
                          </section>
  
                      </section>
                  </us-page-home>
              </div>
          </div>
      </div>
  
      </div>
    );
  }
  
  export default HomePage;
  