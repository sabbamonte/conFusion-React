import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import moment from 'moment';

   
    function RenderDish({dish}) {
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

    
    function RenderComments({comments}) {
        if (comments != null) {
            const all_comments = comments.comments.map((comment) => {
                return(
                    <ul className="list-unstyled">
                        <li>{comment.comment}</li>
                        <li> -- {comment.author}, {moment(comment.date).format('MMM DDD YYYY')}</li>
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

    const DishDetail = (props) => {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                       <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.dish}/>
                    </div>
                </div>
            </div>
        );
    }
        
            
            
        


export default DishDetail;