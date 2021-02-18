import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import moment from 'moment';
import {Link} from 'react-router-dom';

   
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
            const all_comments = comments.map((comment) => {
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
                <div>Nothing</div>
            )
        }
    }

    const DishDetail = (props) => {
        return(
            <div className="container">
                <div class="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div class="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                       <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}/>
                    </div>
                </div>
            </div>
        );
    }
        
            
            
        


export default DishDetail;