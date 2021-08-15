import React from 'react';

// ajax
//import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axios from 'axios';

// reactstrap components
import { Button, Form, Input } from "reactstrap";
// react toast
import { toast } from 'react-toastify'; //import toast

import history from './../../history';

class LoginForm extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            account : '',
            password : '',
        }

        this.changeState = this.changeState.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    changeState(event){
        let changeName = event.target.name
        this.setState({ [changeName]: event.target.value })
    }
    
    //新增一個submit的function
    submitForm(event){
        event.preventDefault()
        
        axios.post('http://localhost:8080/api/login',this.state).
        then( response => {
            if (response.data.status == "1") {
                // 成功
                
                history.push('/home');

            } else {
                // 失敗
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
  
        //    this.setState({message:"User created successfuly."})
        }).catch( error => {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        })
    }

    render() {
        return (
            <Form className="register-form" onSubmit={this.submitForm}>
            <label>帳號</label>
            <Input placeholder="帳號" type="text" id="account" name="account" value={this.state.account} onChange={this.changeState} />
            <label>密碼</label>
            <Input placeholder="密碼" type="password" id="password" name="password" value={this.state.password} onChange={this.changeState}  />
            <Button block value="登入" className="btn-round" color="danger" >登入</Button>
          </Form>
        )
    }
}


export default LoginForm;