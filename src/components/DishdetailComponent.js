import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb,
    Modal, ModalHeader, ModalBody, Button, Row, Label, Col } from 'reactstrap';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen:false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log('Current State is' + JSON.stringify(values))
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return(
            <div className="conatiner">
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment </Button>
                <Modal isOpen={this.state.isModalOpen}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col md={10}>
                                    <strong><Label htmlFor="rating">Rating</Label></strong>
                                    <Control.select model='.rating' id="rating" name="rating" className="form-control"
                                        validators={{required}}>
                                        <option selected="true" disabled="true">0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>  
                                    <Errors
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        messages={{
                                            required: "Please choose a rating"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                    <strong><Label htmlFor="author">Your Name</Label></strong>
                                    <Control.text model='.author' id='author' name='author' placeholder="Your Name" className='form-control'
                                        validators={{required, maxLength: maxLength(15), minLength: minLength(3)}}/>
                                    <Errors 
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: "This field is required. ",
                                            maxLength: "Keep it under 15 characters",
                                            minLength: "This field needs to be at least 3 characters"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                    <strong><Label htmlFor="comment">Comment</Label></strong>
                                    <Control.textarea model='.comment' id='comment' name='comment' rows='6' className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-grop">
                                <Col md={{size:3}}>
                                    <Button type='submit' color="primary"> Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
   
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


function RenderComments({comments, addComment, dishId}) {
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
                <CommentForm dishId={dishId} addComment={addComment}/>
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
                    <RenderComments comments={props.comments} 
                        addComment={props.addComment} 
                        dishId={props.dish.id}/>
                </div>
            </div>
        </div>
    );
}
    
export default DishDetail;