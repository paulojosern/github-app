'use strict'
import Style from './app.css'
import React, { PropTypes } from 'react'
import Search from 'components/search'
import Userinfo from 'components/user-info'
import Actions from 'components/actions'
import Repos from 'components/repos'


const AppContent= ({ userinfo, repos, starred, handleSearch, getRepos, getStarred, isFetching }) => (
    <div className={Style.app}>
        <Search isDisabled={isFetching} handleSearch={handleSearch}/>
        {isFetching && <div>Carregando...</div>}
        {!!userinfo && <Userinfo userinfo={userinfo}/>} 
        {!!userinfo && <Actions getRepos={getRepos} getStarred={getStarred}/>}
        {!!repos.length && 
            <Repos 
                className='repos' 
                title='Repositórios: ' 
                repos={repos}
            />
        }
        {!!starred.length &&
            <Repos 
                className='starred' 
                title='Favoritos: '
                repos={starred}
            />
        }
    </div>
)

AppContent.propTypes = {
    userinfo: PropTypes.object,
    repos: PropTypes.array.isRequired,
    starred: PropTypes.array.isRequired,
    handleSearch: PropTypes.func.isRequired, 
    getRepos: PropTypes.func.isRequired, 
    getStarred: PropTypes.func.isRequired, 
    isFetching: PropTypes.bool.isRequired

}
export default  AppContent