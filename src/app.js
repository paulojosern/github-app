'use strict'

import React, { Component } from 'react'
import ajax from '@fdaciuk/ajax'
import AppContent from './components/app-content'


//smart components 
//statefull
class App extends Component {
    constructor(){
        super()
            this.state = {
                userinfo: null,
                repos: [],
                starred: [],
                isFetching: false
        }
        this.handleSearch = this.handleSearch.bind(this)
    }
    getGitHubApiUrl (username, type){
        const newType = type ? `/${type}` : ''
        const newUsername = username ? `/${username}` : ''
        return `https://api.github.com/users${newUsername}${newType}`
    }
    handleSearch(e) {
        const value = e.target.value
        const keycode = e.which || e.keyCode
        const ENTER = 13
        
        if(keycode === ENTER){
            this.setState({
                isFetching: true
            })
            ajax().get(this.getGitHubApiUrl(value))
                .then((result) => {
                    this.setState({
                        userinfo: {
                            username: result.name,
                            photo: result.avatar_url,
                            login: result.login,
                            repos: result.public_repos,
                            followers: result.followers,
                            following: result.following
                        },
                        repos: [],
                        starred: [],
                    })
                })
                .always(() => {
                    this.setState({
                        isFetching: false
                    })
                })

        }
    }
    getRepos(type) {
        return (e) => {
            const username = this.state.userinfo.login
            ajax().get(this.getGitHubApiUrl(username, type))
                .then((result) => {
                    this.setState({
                        [type]: result.map((repo) => ({
                            name: repo.name,
                            link: repo.html_url
                        })),
                        [!type]: [],
                    })
                })
        } 
    }
    render() {
        return (
            <AppContent
                {...this.state}
                handleSearch={this.handleSearch}
                getRepos={this.getRepos('repos')}
                getStarred={this.getRepos('starred')}   
            />
        )
    }
}
export default App