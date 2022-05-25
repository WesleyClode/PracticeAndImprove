import React,{Component} from "react";
import Header from './header'
import Footer from './footer'

export class Index extends Component{
    render(){
        return(
            <div>
                index page
                <Header/>
                <Footer/>
            </div>
        )
    }
}
export default Index