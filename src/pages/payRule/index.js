import React from 'react';
import {Card,Form} from 'antd';
const FormItem =Form.Item;
class Index extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  render(){
    const {} =this.props;
    return(
      <Form>
        <Card title={
          <FormItem>
            {

            }
          </FormItem>
        }
        />
      </Form>
    );
  }
}
export default Index;
