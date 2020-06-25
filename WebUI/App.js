import React, { Component} from 'react';
import Web3 from 'web3';
import './App.css';
import { POINTTOKEN_ABI, POINTTOKEN_ADDRESS} from './config.js'
import PageName from './PageName';

class App extends Component {

  componentWillMount (){
    this.loadBlockchaindata();
  }

  async loadBlockchaindata (){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const network = await web3.eth.net.getNetworkType()
    const accounts = await web3.eth.getAccounts()
    
    this.setState({account: accounts[0]})

    console.log("network:", network)
    console.log("account:", accounts[0])

    // Get the contract instance.
    const PointToken = new web3.eth.Contract(POINTTOKEN_ABI,POINTTOKEN_ADDRESS)
    this.setState({PointToken})
    console.log("PointToken:", PointToken)

   
   this.setState({})
    //Loading Page
    this.setState({ loading: false})

    

  }

  constructor(props){
    super(props);
    this.state = { 
      account: '',
      loading: true,
      
      
    };
   

  }

  render(){
      return (
        <div className="container">
          <h1>Hello World</h1> 
          <p>Your Account: {this.state.account}</p>
      
          
          {this.state.loading 
          ?
            <div id="loader" className="text-center"><p className="text-center">loading....</p></div>
            : <PageName/>
          }
         
        </div>
      );
  }
}

export default App;
