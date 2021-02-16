import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import moment from 'moment';



class DishDetail extends Component {
    constructor(props){
        super(props);
    }

    renderDish(dish) {
        if (dish != null) {
            return(
                <Card>
                    <CardImg width="100%" object src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name} </CardTitle>
                        <CardText>{dish.description} </CardText>
                    </CardBody>
                </Card>
            )
        }
        else {
            return(
                <div></div>
            )   
        }
    }

    
    renderComments(comments) {
        if (comments != null) {
            const all_comments = comments.comments.map((comment) => {
                return(
                    <ul className="list-unstyled">
                        <li>{comment.comment}</li>
                        <li> -- {comment.author}, {moment(comment.date).format('MMM DD YYYY')}</li>
                    </ul>    
                );  
                
            });
            return (
                <div>
                    <h4>Comments</h4>
                    {all_comments}
                </div>
            );
        }
        else {
            return(
                <div></div>
            )
        }
    }

    render() {
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish)}
                </div>
            </div>
            
        );
    }
}

export default DishDetail;