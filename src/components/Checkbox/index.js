import React from 'react'
import {Checkbox} from 'antd'
class Index extends React.Component{
  constructor(){
    super()
    this.state={
      checked:false
    }
  }
  static getDerivedStateFromProps(nextProps){
    if('value' in nextProps){
      return {
        checked:(nextProps.value==='true'||nextProps.value===true)?true:false
      };
    }
  }
  handleChange=(e)=>{
    this.setState({
      checked:e.target.checked
    })
    console.log(e)
    if(this.props.onChange&&typeof this.props.onChange==='function'){
      this.props.onChange(e.target.checked)
    }
  }
  render(){
    return(
      <Checkbox onChange={this.handleChange} checked={this.state.checked}/>
    )
  }
}
export default Index
