import React, { Component } from "react";
import Saved from "./Saved";
import Search from "./Search";
import Results from "./Results";
import API from "../utils/API";


import Jumbotron from "../pageComponents/Jumbotron";
import { Col, Row, Container } from "../pageComponents/Grid";


class Main extends Component {

  state = {
    topic: "",
    startYear: "",
    endYear: "",
    articles: [],
    saved: []
  };

  componentDidMount() {
    this.getSavedArticles();
  }

  getSavedArticles = () => {
    API.getArticle()
      .then((res) => {
        this.setState({ saved: res.data });
      });
  }

  renderArticles = () => {
    return this.state.articles.map(article => (
      <Results
        _id={article._id}
        key={article._id}
        title={article.headline.main}
        date={article.pub_date}
        url={article.web_url}
        handleSaveButton={this.handleSaveButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }

  renderSaved = () => {
    return this.state.saved.map(save => (
      <Saved
        _id={save._id}
        key={save._id}
        title={save.title}
        date={save.date}
        url={save.url}
        handleDeleteButton={this.handleDeleteButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }

  handleTopicChange = (event) => {
    this.setState({ topic: event.target.value });
  }

  handleStartYearChange = (event) => {
    this.setState({ startYear: event.target.value });
  }

  handleEndYearChange = (event) => {
    this.setState({ endYear: event.target.value });
  }

  // When the search form submits, perform NYT api search with user input
  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Getting NYT Articles");
    console.log("this.state.topic: ", this.state.topic);
    console.log("this.state.startYear: ", this.state.startYear);
    console.log("this.state.endYear: ", this.state.endYear);
    API.searchNYT(this.state.topic, this.state.startYear, this.state.endYear)
      .then((res) => {
        this.setState({ articles: res.data.response.docs });
        console.log("this.state.articles: ", this.state.articles);
      });
  }

  handleSaveButton = (id) => {
    const findArticleByID = this.state.articles.find((el) => el._id === id);
    console.log("findArticleByID: ", findArticleByID);
    const newSave = {title: findArticleByID.headline.main, date: findArticleByID.pub_date, url: findArticleByID.web_url};
    API.saveArticle(newSave)
    .then(this.getSavedArticles());
  }

  handleDeleteButton = (id) => {
    API.deleteArticle(id)
      .then(this.getSavedArticles());
  }

  render() {
    return (

      
        <Container fluid>
            <Row>
                <Col size="md-12">
                <Jumbotron> 
                    <h1 className="text-center"><strong>New York Times Article Search</strong></h1>
                    <h2 className="text-center">Search for and save articles of interest.</h2>
                </Jumbotron>
                </Col>
            </Row>
            <Row>
                <Col size="md-12">
                <Search
                    handleTopicChange={this.handleTopicChange}
                    handleStartYearChange={this.handleStartYearChange}
                    handleEndYearChange={this.handleEndYearChange}
                    handleFormSubmit={this.handleFormSubmit}
                    renderArticles={this.renderArticles}
                />
                </Col>
            </Row>
            <Row>
                <Col size="md-12">
                    <Container fluid>
                        <div>
                            <h3><strong>Saved Articles</strong></h3>
                            {this.renderSaved()}
                        </div>
                    </Container>
                </Col>
            </Row>
          </Container>


    );
  }

}

export default Main;