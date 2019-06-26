import React, { Component } from "react";
import { database } from "../firebase";
import _ from "lodash";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import renderHTML from "react-render-html";
import "../App.css";
import Header from "./Header";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      body: "",
      summary: "",
      date: "",
      posts: {}
    };
    //bind
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.published = this.published.bind(this);
  }

  //Lifecycle
  componentDidMount() {
    database.on("value", snapshot => {
      this.setState({
        posts: snapshot.val()
      });
    });
  }

  //Render Firebase Posts Data
  renderPosts() {
    return _.map(this.state.posts, (post, key) => {
      return (
        <div key={key}>
          <h2>{post.title}</h2>
          <p>{post.date}</p>
          <p>{renderHTML(post.body)}</p>
        </div>
      );
      //Using renderHTML() method above, it converts the viewable script tags into actual HTML
    });
  }

  onHandleChange(e) {
    this.setState({ body: e });
  }

  onHandleSubmit(e) {
    e.preventDefault();
    const post = {
      id: this.id(),
      title: this.state.title,
      summary: this.state.summary,
      date: this.published(),
      body: this.state.body
    };
    database.push(post);
    this.setState({
      id: "",
      title: "",
      summary: "",
      date: "",
      body: ""
    });
  }

  published() {
    var date = new Date();
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    var publishedDate = monthNames[monthIndex] + " " + day + ", " + year;

    return publishedDate;
  }

  id() {
    var rand = Math.floor(Math.random() * 3928 + 1);
    return rand;
  }

  render() {
    return (
      <div className="container">
        <div>
          <br />
          <Header />
          <br />
          <br />
        </div>
        <form onSubmit={this.onHandleSubmit}>
          <div className="form-group">
            <input
              value={this.state.title}
              type="text"
              name="title"
              id="postTitle"
              placeholder="Title"
              onChange={e => {
                this.setState({ title: e.target.value });
              }}
              ref="title"
            />
            <br />
            <p
              value={this.state.date}
              type="text"
              name="date"
              id="postDate"
              ref="date"
              onChange={e => {
                this.setState({ date: e.target.value });
              }}
            >
              {this.published()}
            </p>

            <textarea
              value={this.state.summary}
              id="postSummary"
              type="text"
              name="summary"
              placeholder="Summary"
              onChange={e => {
                this.setState({ summary: e.target.value });
              }}
              ref="summary"
            />
          </div>
          <div className="form-group">
            <ReactQuill
              modules={App.modules}
              formats={App.formats}
              value={this.state.body}
              placeholder="Write Something ..."
              onChange={this.onHandleChange}
              id="postEssay"
            />
          </div>
          <button id="post">Post</button>
        </form>
        <br />
        <br />
      </div>
    );
  }
}

App.modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }, { color: [] }],
    ["link", "image", "video"],
    ["clean"]
  ]
};

App.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "color",
  "link",
  "image",
  "video"
];

export default App;
