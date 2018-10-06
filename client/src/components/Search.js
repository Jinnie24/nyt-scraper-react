import React from "react";
import { Col, Row, Container } from "../pageComponents/Grid";
import {FormBtn, Input} from '../pageComponents/Form'


const Search = props =>
    <Container fluid>
        <Row>
            <Col size="md-12">
                <h3>Search</h3>
                <form>
                    <Input
                        onChange={props.handleTopicChange}
                        name="topic"
                        placeholder="Topic"
                        id="topic"
                    />
                    <Input
                        onChange={props.handleStartYearChange}
                        name="start-year"
                        placeholder="Start Year"
                        id="start-year"
                    />
                    <Input
                        onChange={props.handleEndYearChange}
                        name="end-year"
                        placeholder="End Year"
                        id="end-year"
                    />
                    <FormBtn
                        className="btn btn btn-secondary"
                        onClick={props.handleFormSubmit}
                        type="submit"
                    >
                        Submit
                    </FormBtn>
                </form>

           
            </Col>
        </Row>
        <Row>
            <Col size="md-12">
                <div>
                    <h3><strong>Results</strong></h3>
                    {props.renderArticles()}
                </div>
            </Col>
        </Row>
    </Container>


export default Search;