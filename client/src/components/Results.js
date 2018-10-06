import React from "react";
import { Col, Row, Container } from "../pageComponents/Grid";
import { List, ListItem } from "../pageComponents/List";

const Results = props =>

  <Container>
      <Row>
          <Col size="md-12">
            <List className="list-group-item">
                <ListItem>
                    <h5><span><em>{props.title}</em></span></h5>
                    <p>Date Published: {props.date}</p>
                    <a href={props.url} target="_blank">
                        <button className="btn btn-default ">View Article</button>
                    </a>
                    <button className="btn btn-dark" onClick={() => props.handleSaveButton(props._id)}>Save</button>
                </ListItem>  
            </List>
          </Col>
      </Row>
  </Container>

export default Results;