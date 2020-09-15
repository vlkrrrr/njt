import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';
import './Blog.css';
import Posts from './Posts/Posts'
import NewPost from './NewPost/NewPost'
import { Route, Link,NavLink , Switch } from 'react-router-dom'
import FullPost from './FullPost/FullPost'


class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash:'#submit',
                                search: '?quick_submit=true'
                            }}>New Post</NavLink></li>                       
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" render={() => <h1>HOME</h1>}></Route> */}
                <Switch>
                <Route path="/" exact component={Posts} />
                <Route path="/new-post" component={NewPost} />
                <Route path="/:id" exact component={FullPost} />
                </Switch>

            </div>
        );
    }
}

export default Blog;