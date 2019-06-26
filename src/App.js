import React from 'react';
import {Container ,Input ,InputGroup ,InputGroupAddon ,Button ,Card, CardBody, CardText , CardTitle ,Table} from 'reactstrap';
import axios from 'axios';

export default class App extends React.Component{

    state ={
      letter : '',
      load : false,
      info : '' ,
      list : []
    };

    Letter = e =>{
        if (e.target.value) {
            this.setState({
                letter: e.target.value
            })
        }
    };

    Search = ()=>{
        axios({
            url: 'http://localhost:3030/actors/'+ this.state.letter
        }).then((response)=>{

            // console.log(response.data);

            this.setState({
                list : response.data
            })

        }).catch((error)=>{
                console.log(error);

            }
        );
    };

    Load = (e)=>{

        axios({
            url: 'http://localhost:3030/info/'+e.target.value
        }).then((response)=>{

            // console.log(response.data);
            var txt = JSON.stringify(response.data);
            txt= txt.slice(15,txt.length - 3);

            this.setState({
                info : txt
            })

        }).catch((error)=>{
            console.log(error);

            }
        );

        this.setState({
            load : true
        })

    };

    Close =()=>{
        this.setState({
            info : ''
        })
    };

    render() {return (

        <div>
            <br/>
            <Container>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Letter</InputGroupAddon>
                        <Input onChange={this.Letter} placeholder="Letter"  />
                        <InputGroupAddon addonType="append">
                            <Button outline color="info" onClick={this.Search}>search</Button>
                        </InputGroupAddon>
                    </InputGroup>
                    <br/>


            <br/>

                    <Table hover size="sm">
                        <tbody>
                        {
                            this.state.list.map(( item, index)=>{
                                return(

                                    <tr>
                                        <th key={item.actor_id} scope="row">{index+1}</th>
                                        <td key={index}><Button block outline color="secondary" value={item.actor_id} onClick={this.Load}> {item.last_name + '      ' + item.first_name} </Button></td>
                                    </tr>
                                )
                               }
                            )
                        }
                        </tbody>
                    </Table>

                {
                    this.state.info !== '' &&
                    <Card style={ {backgroundColor : "rgb(217, 217, 217)"}}>
                        <CardBody>
                            <CardTitle>

                                <Button close onClick={this.Close}/>

                            </CardTitle>
                            <CardText>{this.state.info}</CardText>
                        </CardBody>
                    </Card>
                }
            </Container>
        </div>

    )

    }

}