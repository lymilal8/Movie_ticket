import React from 'react'
import Header from './Header'
import Footer from './Footer';

const Main = (props) => {
    console.log(props);
  return (
    <div>
        <Header/>
        {props.child}
        <Footer/>
    </div>
  )
}

export default Main