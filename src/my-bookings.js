import React, { Component } from 'react';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Config from './config.js'

const cookies = new Cookies();

class MyBookings extends Component {
constructor(props){
    super(props);
    this.state={
        bookings: []
    }
}

componentWillMount() {
    let listBookings = []
    this.getBookings(bookings => {
        listBookings = bookings.map(booking => 
         <MuiThemeProvider>
            <div class="card-item">
                <h2>Hotel: {booking.hotel_details[0].name} </h2>
                <h3>Location: {booking.hotel_details[0].location} </h3>
                <h3>Room No: {booking.room_details[0].no}</h3>
                <h3>From Date: {booking.from} </h3>
                <h3>To Date: {booking.to} </h3>
                <h3>No of People: {booking.no_of_people} </h3>
            </div>
         </MuiThemeProvider>
        );
        this.setState({
            bookings: <div class="cards"> {listBookings} </div>
        })
    })   
}

render() {
    return (
        <MuiThemeProvider>
            <a href="/dashboard"> Back to Home </a>
            <div>
            {this.state.bookings}
            </div>

        </MuiThemeProvider>
    );
  }

  getBookings(callback) {
    axios.get(
        Config.ApiBaseUrl+'/bookings', 
        {
            headers: {
                "hoboos-secret": cookies.get("hoboos-secret"),
            }
        },
    ).then(response => {
        console.log(response.data)
        callback(response.data)
    }).catch(function(error){
        console.log(error)
    })

  }

  handleClick(event, hotelId, hotelName) {
    window.location = "/dashboard/rooms?hotel_id="+hotelId+"&hotel_name="+hotelName
  }
}

export default MyBookings;
